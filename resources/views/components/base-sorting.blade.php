@props(['addSearching', 'buttonAdd', 'modalId', 'headerAddButton'])

<div class="p-3">
    <div class="d-flex justify-content-between align-items-center mb-md-0 row">
        @if ($addSearching == 'true')
            <div
                class="col-md-7 row mb-2 ">
                {{-- Form Search --}}
                <div class="input-icon col-md-4">
                    <input type="text" class="form-control" placeholder="Cari..." id="form-search">
                    <span class="input-icon-addon p-3 text-center" id="search-button">
                        <i class="fa fa-search " style="cursor: pointer;"></i>
                    </span>
                </div>
            </div>
        @endif

        <div class="col-md-5 d-flex justify-content-end align-items-center">
            @if ($buttonAdd == 'true')
                <button class="btn btn-outline-danger ml-2" data-toggle="modal" data-target="{{ $modalId }}">
                    <i class="fas fa fa-plus"></i> {{ $headerAddButton }}
                </button>
            @endif
        </div>
    </div>
</div>
