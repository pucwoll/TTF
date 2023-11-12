-- CreateTable
CREATE TABLE "boats" (
    "id" SERIAL NOT NULL,
    "hotel_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "times" TEXT NOT NULL,

    CONSTRAINT "boats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "boats" ADD CONSTRAINT "boats_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
