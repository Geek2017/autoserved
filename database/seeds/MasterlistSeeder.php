<?php

use Illuminate\Database\Seeder;

class MasterlistSeeder extends Seeder
{
    public function run()
    {
        $this->command->info("Migrating PMS master list.");
        DB::unprepared(file_get_contents("database/sql/masterlist_pms.sql"));

        $this->command->info("Migrating Other PMS Services master list.");
        DB::unprepared(file_get_contents("database/sql/masterlist_pms_others.sql"));

        $this->command->info("Migrating Services master list.");
        DB::unprepared(file_get_contents("database/sql/masterlist_services.sql"));

        $this->command->info("Migrating Car Makes master list.");
        DB::unprepared(file_get_contents("database/sql/masterlist_car_makes.sql"));

        $this->command->info("Migrating Car Models master list.");
        DB::unprepared(file_get_contents("database/sql/masterlist_car_models.sql"));

        $this->command->info("Migrating Car Generations master list.");
        DB::unprepared(file_get_contents("database/sql/masterlist_car_generations.sql"));

        $this->command->info("Migrating Car Series master list.");
        DB::unprepared(file_get_contents("database/sql/masterlist_car_series.sql"));

        // $this->command->info("Migrating Car Trims master list.");
        // DB::unprepared(file_get_contents("database/sql/masterlist_car_trims.sql"));
    }
}
