-- CreateTable
CREATE TABLE "hotels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journeys" (
    "uuid" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "journeys_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "taxi_companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "taxi_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "taxi_company_id" INTEGER NOT NULL,
    "max_people" INTEGER NOT NULL,
    "station_id" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_taxi_company_id_fkey" FOREIGN KEY ("taxi_company_id") REFERENCES "taxi_companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
