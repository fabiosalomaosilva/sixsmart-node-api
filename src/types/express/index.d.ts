import { UserModelDto } from '../../models/user';
declare global {
  namespace Express {
    // tslint:disable-next-line:no-empty-interface

    export interface User {
      _json: UserModelDto | undefined;
      id: string | undefined;
    }
  }
}
