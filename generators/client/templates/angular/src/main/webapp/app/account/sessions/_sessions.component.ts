<%#
 Copyright 2013-2018 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see http://www.jhipster.tech/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-%>
import { Component, OnInit } from '@angular/core';

import { Principal } from 'app/core';
import { Session } from './session.model';
import { SessionsService } from './sessions.service';

@Component({
    selector: '<%= jhiPrefixDashed %>-sessions',
    templateUrl: './sessions.component.html'
})
export class SessionsComponent implements OnInit {

    account: any;
    error: string;
    success: string;
    sessions: Session[];

    constructor(
        private sessionsService: SessionsService,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.sessionsService.findAll().subscribe((sessions) => this.sessions = sessions);

        this.principal.identity().then((account) => {
            this.account = account;
        });
    }

    invalidate(series) {
        this.sessionsService.delete(encodeURIComponent(series)).subscribe(
            (response) => {
                if (response.status === 200) {
                    this.error = null;
                    this.success = 'OK';
                    this.sessionsService.findAll().subscribe((sessions) => this.sessions = sessions);
                } else {
                    this.success = null;
                    this.error = 'ERROR';
                }
            });
    }
}
