<?php

use Illuminate\Database\Seeder;

class UploadsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // How many uploads you need, defaulting to 10
        $user_id = (int)$this->command->ask('What user id should we associate this upload ?', 1);
        $count = (int)$this->command->ask('How many uploads do you need ?', 10);

        $this->command->info("Creating {$count} uploads.");

        // Create the Upload
        $uploads = factory(App\Upload::class, $count)->create([
            'user_id' => $user_id
        ]);

        $this->command->info('Uploads Created!');
    }
}
