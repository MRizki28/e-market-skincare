<div class="table-responsive">
    <table class="table" id="{{ $initId }}">
        <thead style="background-color: #f7f8fa;">
            {{ $thead }}
        </thead>
        <tbody class="text-center">

        </tbody>
        <tfoot id="dataNotFound">
            <tr class="text-center text-muted" id="template-empty-info">
                <td colspan="9" class=" ">
                    <i class="fas fa-folder-open mr-1"></i> Data tidak ditemukan ...
                </td>
            </tr>
        </tfoot>
    </table>
    <div class="d-flex justify-content-between align-items-center px-4">
        <span class="mb-3 text-muted">
            Total <span id="data-total"></span> data
        </span>
        <ul class="pagination pg-info"></ul>
    </div>
</div>