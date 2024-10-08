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
        Schema::create('tb_order', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_profile')->constrained('tb_profile')->onDelete('cascade');
            $table->foreignUuid('id_product')->constrained('tb_product')->onDelete('cascade');
            $table->integer('price');
            $table->integer('quantity');
            $table->integer('total_price');
            $table->enum('status', ['pending', 'success', 'cancel']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_order');
    }
};
