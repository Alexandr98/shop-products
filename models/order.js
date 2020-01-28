import moment from 'moment';

class Order {
  constructor(id, items, total, date) {
    this.id = id;
    this.items = items;
    this.total = total;
    this.date = date;
  }

  get readableDate() {
    return moment(this.date).format('MM/DD/YYYY, hh:mm');
  }
}

export default Order;
