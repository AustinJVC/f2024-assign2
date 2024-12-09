function generateModalStyling(modal, overlay, modalContent, closeButton, resultsTitle, resultsSection, h2){
    modal.classList.add('fixed');
    modal.classList.add('top-1/2');
    modal.classList.add('left-1/2');
    modal.classList.add('-translate-x-1/2');
    modal.classList.add('-translate-y-1/2');
    modal.classList.add('bg-white');
    modal.classList.add('p-10');
    modal.classList.add('rounded-md');
    modal.classList.add('z-10');
    modal.classList.add('w-[50vw]');
    modal.classList.add('h-[50vh]');

    overlay.classList.add('fixed'); 
    overlay.classList.add('top-0'); 
    overlay.classList.add('left-0'); 
    overlay.classList.add('w-[100vw]'); 
    overlay.classList.add('h-[100vh]'); 
    overlay.classList.add('bg-black/50');
    
    modalContent.classList.add('modal-content');
    modalContent.classList.add('grid');
    modalContent.classList.add('grid-cols-[1fr_1fr]');

    closeButton.classList.add('absolute');
    closeButton.classList.add('top-3');
    closeButton.classList.add('right-3');
    closeButton.classList.add('text-2xl');
    closeButton.classList.add('cursor-pointer');

    resultsTitle.classList.add("text-2xl")

    resultsSection.classList.add('max-h-96');
    resultsSection.classList.add('overflow-y-auto');

    h2.classList.add("text-2xl")
    
}

function generateTableStyling(table){
    table.classList.add('border')
    table.classList.add('border-black')
    table.classList.add('border-w-10')
    table.classList.add('w-full')
    table.classList.add('table-auto')
    
}

function generateTDStyling(td){
    td.classList.add('pl-[8px]')
    td.classList.add('pt-[6px]')
    if(td.querySelector('a') != null){
        td.classList.add('cursor-pointer');
        td.classList.add('underline')
    }
}

function generateTRStyling(tr){
    tr.classList.add('even:bg-red-100')
}

function generateTHStyling(th){
    th.classList.add('text-left')
    th.classList.add('pl-[8px]')
}