export class Order {
    destFrom: string;
    destTo: string;
    date: string;
    time: string;
    parcelTypeID: number;
    weight: number;
    deliveryTypeID: number;
    deliveryType: string;
    paymentMethodID: number;
    orderStatus: number;
    userID?: string;
    statusString: string;
    parcelType: string;
    distance: number;
    price: number;
    courierID?: string;
    public static Parse(any): Order[] {
        var res = new Array<Order>();
        any.forEach(e => {
            var tmp = new Order();
            tmp.destFrom = e.destFrom;
            tmp.destTo = e.destTo;
            tmp.date = e.date;
            tmp.time = e.time;
            tmp.parcelTypeID = e.parcelTypeID;
            tmp.weight = e.weight;
            tmp.deliveryTypeID = e.deliveryTypeID;
            tmp.paymentMethodID = e.paymentMethodID;
            tmp.parcelType = e.parcelType.name;
            tmp.orderStatus = e.orderStatus;
            tmp.distance = e.distance;
            tmp.price = e.price;
            tmp.userID = e.userID;
            tmp.courierID = e.courierID;
            switch (e.deliveryTypeID) {
                case 1:
                    tmp.deliveryType = "Express"
                    break;
                case 2:
                    tmp.deliveryType = "Standart"
                    break;
                case 3:
                    tmp.deliveryType = "Same-Day"
                    break;
                default: tmp.deliveryType = "Standart";
                    break;
            }

            switch (e.orderStatus) {
                case 0:
                    tmp.statusString = "New"
                    break;
                case 1:
                    tmp.statusString = "Progress"
                    break;
                case 1:
                    tmp.statusString = "Done"
                    break;
                default: tmp.statusString = "Done";
                    break;
            }
            res.push(tmp);
        });
        return res;
    }
}