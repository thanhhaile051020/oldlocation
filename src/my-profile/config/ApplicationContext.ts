import axios from 'axios';
import {HttpRequest} from 'axios-core';
import {httpOptionsService} from 'uione';
import {InterestClient} from '../service/client/InterestClient';
import {MyProfileClient} from '../service/client/MyProfileClient';
import {SkillClient} from '../service/client/SkillClient';
import {InterestService} from '../service/InterestService';
import {MyProfileService} from '../service/MyProfileService';
import {SkillService} from '../service/SkillService';

const httpRequest = new HttpRequest(axios, httpOptionsService);

class ApplicationContext {
  readonly myProfileService: MyProfileService;
  readonly skillService: SkillService;
  readonly interestService: InterestService;

  constructor() {
    this.myProfileService = new MyProfileClient(httpRequest);
    this.skillService = new SkillClient(httpRequest);
    this.interestService = new InterestClient(httpRequest);
  }
}

const applicationContext = new ApplicationContext();

export default applicationContext;
