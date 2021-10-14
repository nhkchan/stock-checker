import { PickUp } from './pickup.model';
import { Shipping } from './shipping.model';

export class Stock {
    pickup?: PickUp;
    shipping?: Shipping;
    sku: string;
    sellerId: string;
    saleChannelExclusivity: string;
    scheduledDelivery: boolean;
    isGiftCard: boolean;
    isService: boolean;
}