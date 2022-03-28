import {hasPrivilege} from 'src/core/authorization';
import {EditPermission, EditPermissionBuilder} from 'uione';
import {UserAccount} from 'uione';

export class ODDEditPermissionBuilder implements EditPermissionBuilder {
  buildPermission(user: UserAccount, url: string): EditPermission {
    let p: EditPermission;
    if (!user) {
      p = {
        'addable': false,
        'editable': false,
        'deletable': false
      };
    } else {
      const userType = user.userType;
      const userModules = user.privileges;
      p = {
        'addable': false,
        'editable': false,
        'deletable': false
      };
      if (hasPrivilege(userModules, url)) {
        if (userType === 'M') { // TODO use enum
          p = {
            'addable': true,
            'editable': true,
            'deletable': false
          };
        } else if (userType === 'C') { // TODO use enum
          p = {
            'addable': false,
            'editable': false,
            'deletable': false
          };
        } else {
          p = {
            'addable': false,
            'editable': false,
            'deletable': false
          };
        }
      }
      }
    return p;
  }
}
