import AccessResourcesEN from '../access/config/AccessResourceEN';
import AccessResourcesVI from '../access/config/AccessResourceVI';
import AuthenticationResourceEN from '../authentication/AuthenticationResourceEN';
import AuthenticationResourceVI from '../authentication/AuthenticationResourceVI';
import ReportResourceEN from '../report/config/ReportResourceEN';
import ReportResourceVI from '../report/config/ReportResourceVI';
/*
import SetupResourcesEN from '../setup/config/SetupResourceEN';
import SetupResourcesVI from '../setup/config/SetupResourceVI';
*/
import CommonResourcesEN from './ResourcesEN';
import CommonResourcesVI from './ResourcesVI';

const ResourcesEN = {
  ...CommonResourcesEN,
  ...AuthenticationResourceEN,
  ...AccessResourcesEN,
  ...ReportResourceEN,
};
const ResourcesVI = {
  ...CommonResourcesVI,
  ...AuthenticationResourceVI,
  ...AccessResourcesVI,
  ...ReportResourceVI,
};

const Resources = {
  ['en']: ResourcesEN,
  ['vi']: ResourcesVI
};

export default Resources;
