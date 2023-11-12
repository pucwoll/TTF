-- CreateTable
CREATE TABLE "hotel_transfers" (
    "id" SERIAL NOT NULL,
    "hotel_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "hotel_transfers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hotel_transfers" ADD CONSTRAINT "hotel_transfers_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
