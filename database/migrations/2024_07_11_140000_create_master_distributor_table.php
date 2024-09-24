<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_distributor', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_user')->constrained('users');
            $table->string('image_distributor', 50)->nullable();
            $table->string('name_distributor', 50);
            $table->text('address');
            $table->text('description');
            $table->string('phone_number', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_distributor');
    }
};
