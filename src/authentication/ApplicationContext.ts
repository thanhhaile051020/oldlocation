import {Authenticator, AuthInfo} from 'authentication-component';
import {AuthenticationWebClient} from 'authentication-component';
import {OAuth2WebClient} from 'authentication-component';
import {OAuth2Service} from 'authentication-component';
import axios from 'axios';
import {HttpRequest} from 'axios-core';
import {PasswordService} from 'password-component';
import {PasswordWebClient} from 'password-component';
import {SignupInfo} from 'signup-component';
import {SignupService} from 'signup-component';
import {SignupClient} from 'signup-component';
import config from 'src/config';
import {httpOptionsService} from 'uione';

class ApplicationContext {
  private readonly httpRequest = new HttpRequest(axios, httpOptionsService);
  readonly signupService: SignupService<SignupInfo> = new SignupClient<SignupInfo>(this.httpRequest, config.signupUrl + '/signup/signup', config.signupUrl);
  readonly authenticator: Authenticator<AuthInfo> = new AuthenticationWebClient<AuthInfo>(this.httpRequest, config.authenticationUrl + '/authentication/authenticate');
  readonly passwordService: PasswordService = new PasswordWebClient(this.httpRequest, config.passwordUrl);
  readonly oauth2Service: OAuth2Service = new OAuth2WebClient(this.httpRequest, config.authenticationUrl + '/oauth2/authenticate', config.authenticationUrl + '/integrationConfigurations');
}

export const applicationContext = new ApplicationContext();
