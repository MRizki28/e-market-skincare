<div class="modal fade" id="userManagementModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <div class="form-group form-show-validation">
                                <label for="email">Email</label>
                                <input type="email" class="form-control"  name="email" id="email" placeholder="Input here">
                            </div>
                            <div class="form-group form-show-validation">
                                <label for="role">Role</label>
                                <select name="role" id="role" class="form-control" style="width: 100%; height: 30px;">
                                    <option value="" selected disabled hidden>Choose here</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                            <div class="form-group form-show-validation">
                                <label for="password">Password</label>
                                <input type="text" class="form-control " readonly="readonly"  name="password"
                                    id="password" value="12345678">
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