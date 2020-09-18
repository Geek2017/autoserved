<?php

use Illuminate\Database\Seeder;

class ApplicationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // How many application you need, defaulting to 10
        $count = (int)$this->command->ask('How many application do you need ?', 10);

        $this->command->info("Creating {$count} applications.");

        // Create the Application
        $application = factory(App\Application::class, $count)->create();

        $this->command->info('Applications Created!');
    }
}
