<div class="modal fade" id="productModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="max-width: 550px; ">
        <div class="modal-content">
            <div class="container">
                <div class="modal-body">
                    <div class="header">
                        <span style="font-size: 20px;" id="modal-title">Tambah Data</span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="form mt-4">
                        <form action="" id="formTambah">
                            @csrf
                            <input type="hidden" name="id" id="id">
                            <img src="" alt="" id="preview" class="mx-auto d-block pb-2"
                                style="max-width: 200px; padding-top: 23px">
                            <div class="form-group form-show-validation">
                                <label for="product_name">Nama Produk</label>
                                <input type="text" class="form-control" name="product_name" id="product_name"
                                    placeholder="Input here">
                            </div>
                            <div class="form-group form-show-validation">
                                <label for="price">Harga</label>
                                <input type="text" class="form-control" name="price" id="price"
                                    placeholder="Rp.">
                            </div>
                            <div class="form-group form-show-validation">
                                <label for="stock">Stok</label>
                                <input type="number" class="form-control" name="stock" id="stock"
                                    placeholder="1">
                            </div>
                            <div class="form-group form-show-validation">
                                <label for="product_image">Gambar</label>
                                <input type="file" class="form-control" name="product_image" id="product_image">
                            </div>

                            <div class="form-group form-show-validation">
                                <label for="description">Deskripsi</label>
                                <textarea class="form-control" name="description" id="description" placeholder="Input here" rows="4" cols="50"></textarea>
                            </div>

                            <div class="button-footer d-flex justify-content-between mt-4">
                                <div class="d-flex justify-content-end align-items-end" style="width: 100%;">
                                    <div class="button-footer d-flex justify-content-between mt-4">
                                        <div class="d-flex justify-content-end align-items-end" style="width: 100%;">
                                            <button type="button" class="btn btn-danger text-white mr-3"
                                                data-dismiss="modal" aria-label="Close">Batal</button>
                                            <button class="btn btn-primary" type="submit">Simpan</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
