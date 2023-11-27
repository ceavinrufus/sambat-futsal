export interface Order {
    reservation_id: number;
    reserver_id: number;
    reservation_time: string;
    total_price: number;
    field_id: number;
    booking_code: string;
    payment_proof: string | { path: string; url: string };
  }