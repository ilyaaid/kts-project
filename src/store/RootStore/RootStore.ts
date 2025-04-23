import CartStore from './CartStore';
import QueryParamsStore from './QueryParamsStore';
import UserStore from './UserStore';

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly cart = new CartStore();
  readonly user = new UserStore();
}
