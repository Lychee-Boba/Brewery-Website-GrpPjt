document.addEventListener('DOMContentLoaded', function () {
    const images = ["images/beerImage1.jpg", "images/beerImage2.jpg", "images/beerImage3.jpg", "images/beerImage4.jpg", "images/beerImage5.jpg", "images/beerImage6.jpg", "images/beerImage7.jpg", "images/beerImage8.jpg"];
    let currentIndex = 0;

    setInterval(() => {
    // Fade out
    rotator.classList.add("fade-out");

    //Wait for fade out to finish, then change image and fade back in
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            rotator.src = images[currentIndex];
            rotator.classList.remove("fade-out");
        }, 1000);
    }, 4000);

    const rotator = document.getElementById("rotator");
    const reviewForm = document.getElementById('reviewForm');
    const commentText = document.getElementById('commentText');
    const reviewStream = document.querySelector('.reviewStream');
    const thankYouMessage = document.getElementById('thankYouMessage');
            
            
    const stars = document.querySelectorAll('.star-rating-form .star');
    let currentRating = 0; 

    stars.forEach(star => {
        star.addEventListener('mouseover', function () {
            const hoverValue = this.dataset.value;
            stars.forEach(s => {
                s.classList.toggle('hovered', s.dataset.value <= hoverValue);
            });
        });

        star.addEventListener('mouseout', function () {
            stars.forEach(s => s.classList.remove('hovered'));
        });
               
        star.addEventListener('click', function () {
            currentRating = this.dataset.value;
                stars.forEach(s => {
                    s.classList.toggle('selected', s.dataset.value <= currentRating);
                });
        });
    });

    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const userComment = commentText.value.trim();

        if (currentRating === 0) {
            alert('Please select a star rating!');
            return;
        }
        if (userComment === '') {
            alert('Please write a review before submitting!');
            return;
        }

        const newReviewBox = document.createElement('div');
        newReviewBox.classList.add('reviewBox');

        const starsDisplay = document.createElement('div');
        starsDisplay.classList.add('review-stars');
        for (let i = 1; i <= 5; i++) {
            starsDisplay.innerHTML += (i <= currentRating) ? '★' : '☆';
        }
                
        const commentDisplay = document.createElement('p');
        commentDisplay.classList.add('review-comment');
        commentDisplay.textContent = `"${userComment}"`;

        newReviewBox.appendChild(starsDisplay);
        newReviewBox.appendChild(commentDisplay);

        reviewStream.prepend(newReviewBox);

        thankYouMessage.textContent = 'Thanks for the review!';
        commentText.value = '';
        currentRating = 0;
        stars.forEach(s => s.classList.remove('selected'));

        setTimeout(() => {
            thankYouMessage.textContent = '';
        }, 4000);
    });

});    