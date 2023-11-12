-- CreateTable
CREATE TABLE "bus_times" (
    "id" SERIAL NOT NULL,
    "hotel_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "hour" INTEGER NOT NULL,
    "minute" INTEGER NOT NULL,

    CONSTRAINT "bus_times_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bus_times" ADD CONSTRAINT "bus_times_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
