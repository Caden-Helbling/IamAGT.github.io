document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('preview-modal');
    const modalVideo = modal.querySelector('video');
    const modalPhoto = modal.querySelector('img');
    const modalLeftButton = modal.querySelector('.left');
    const modalRightButton = modal.querySelector('.right');
    const defaultModalButtonDisplay = modalLeftButton.style.display;

    const showVideoModal = (url, showButtons=true) => {
        modalVideo.style.display = 'block';
        modalPhoto.style.display = 'none';

        if (!modal.classList.contains('active')) {
            modal.classList.add('active');
        }

        modalLeftButton.style.display = showButtons ? defaultModalButtonDisplay : 'none';
        modalRightButton.style.display = showButtons ? defaultModalButtonDisplay : 'none';

        modalVideo.setAttribute('src', url);
        modalVideo.play();
    };

    const showPhotoModal = (url, showButtons=true) => {
        modalVideo.style.display = 'none';
        modalPhoto.style.display = 'block';


        if (!modal.classList.contains('active')) {
            modal.classList.add('active');
        }

        modalLeftButton.style.display = showButtons ? defaultModalButtonDisplay : 'none';
        modalRightButton.style.display = showButtons ? defaultModalButtonDisplay : 'none';

        modalPhoto.setAttribute('src', url);
    };


    let selectedThumbnailIndex = undefined;
    const allThumbnails = Array.from(document.querySelectorAll('#gallery .thumbnail'));


    const videoThumbnails = document.querySelectorAll('#gallery .thumbnail.video');
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (e) => {
            selectedThumbnailIndex = allThumbnails.indexOf(thumbnail);
            showVideoModal(e.currentTarget.dataset.url);
        });
    });


    const photoThumbnails = document.querySelectorAll('#gallery .thumbnail.photo');
    photoThumbnails.forEach(thumbnail => {
        const thumbnailImg = thumbnail.querySelector('img');
        thumbnail.addEventListener('click', (e) => {
            selectedThumbnailIndex = allThumbnails.indexOf(thumbnail);
            showPhotoModal(thumbnailImg.getAttribute('src'));
        });
    });

    const selectThumbnail = () => {
        modalVideo.pause();
        allThumbnails[selectedThumbnailIndex].dispatchEvent(new Event('click'));
    }

    modalLeftButton.onclick = (e) => {
        if (selectedThumbnailIndex === undefined) {
            return;
        }

        selectedThumbnailIndex--;
        if (selectedThumbnailIndex < 0) {
            selectedThumbnailIndex = allThumbnails.length - 1;
        }

        selectThumbnail();

        e.stopPropagation();
    }


    modalRightButton.onclick = (e) => {
        if (selectedThumbnailIndex === undefined) {
            return;
        }

        selectedThumbnailIndex++;
        if (selectedThumbnailIndex >= allThumbnails.length - 1) {
            selectedThumbnailIndex = 0;
        }

        selectThumbnail();

        e.stopPropagation();
    }

    modal.addEventListener('click', (e) => {
      modalVideo.pause();
      modalVideo.setAttribute('src', '');
      modalPhoto.setAttribute('src', '');
      modal.classList.remove('active');
    });

});
