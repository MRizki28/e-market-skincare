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
        Schema::create('tb_product', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_distributor')->constrained('tb_distributor')->onDelete('cascade');
            $table->string('product_name', 50);
            $table->string('product_image');
            $table->integer('price');
            $table->timestamps();
        });

        Schema::create('tb_cart', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('id_product', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_product');
        Schema::dropIfExists('tb_cart');
    }
};
