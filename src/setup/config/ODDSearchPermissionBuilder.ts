import {hasPrivilege} from 'src/core/authorization';
import {SearchPermission, SearchPermissionBuilder} from 'uione';
import {UserAccount} from 'uione';

export class ODDSearchPermissionBuilder implements SearchPermissionBuilder {
  buildPermission(user: UserAccount, url: string): SearchPermission {
    let p: SearchPermission;
    if (!user) {
      p = {
        'viewable': false,
        'addable': false,
        'editable': false,
        'approvable': false,
        'deletable': false
      };
    } else {
      const userType = user.userType;
      const userModules = user.privileges;
      p = {
        'viewable': false,
        'addable': false,
        'editable': false,
        'approvable': false,
        'deletable': false
      };
      if (hasPrivilege(userModules, url)) {
        if (userType === 'M') { // TODO use enum
          p = {
            'viewable': true,
            'addable': true,
            'editable': true,
            'approvable': false,
            'deletable': false
          };
        } else if (userType === 'C') { // TODO use enum
          p = {
            'viewable': true,
            'addable': false,
            'editable': false,
            'approvable': true,
            'deletable': false
          };
        } else {
          p = {
            'viewable': false,
            'addable': false,
            'editable': false,
            'approvable': false,
            'deletable': false
          };
        }
      }
      }
    return p;
  }
}
