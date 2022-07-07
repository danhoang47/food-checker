const submitCommentBtn = document.querySelector('.submitFormComment');
const showCommentsBtn = document.querySelector('.showCommentsBtn');
const commentTextBox = document.querySelector('#comment-text-box')
const username = document.querySelector('.user__name')
const fileComment = document.querySelector('.res__main-comment-section .res__main-comment-image')
const formData = new FormData()
const showComment = document.querySelector('.showCommentsBtn')
const resId = document.querySelector('input[name=resId]')
const largeCommentBox = document.querySelector('.res__main-reviews-large')
const midCommentBox = document.querySelector('.res__main-reviews-mid')
const smallCommentBox = document.querySelector('.res__main-reviews-small')

const largeCommentImg = document.querySelector('.res__main-reviews-info-pic--large')
const largeCommentName = document.querySelector('.res__main-reviews-info-name--large')
const largeCommentPoint = document.querySelector('.res__main-reviews-info-point--large')
const largeCommentHeading = document.querySelector('.res__main-reviews-rating-heading--large')
const largeCommentContent = document.querySelector('.res__main-reviews-rating-text--large')

const midCommentImg = document.querySelector('.res__main-reviews-info-pic--mid')
const midCommentName = document.querySelector('.res__main-reviews-info-name--mid')
const midCommentPoint = document.querySelector('.res__main-reviews-info-point--mid')
const midCommentHeading = document.querySelector('.res__main-reviews-rating-heading--mid')
const midCommentContent = document.querySelector('.res__main-reviews-rating-text--mid')

const smallCommentImg = document.querySelector('.res__main-reviews-info-pic--small')
const smallCommentName = document.querySelector('.res__main-reviews-info-name--small')
const smallCommentPoint = document.querySelector('.res__main-reviews-info-point--small')
const smallCommentHeading = document.querySelector('.res__main-reviews-rating-heading--small')
const smallCommentContent = document.querySelector('.res__main-reviews-rating-text--small')
const formSubmitComment = document.querySelector('.formSubmitComment')

largeCommentBox.style.display = 'none'

formData.append('username', username.value)
formData.append('resId', resId.value)
formData.append('rootCmtId', 'rootCmtId')
formData.append('commentInfo', commentTextBox.value)
formData.append('image', formData)

submitCommentBtn.onclick = () => {
    fetch('/food-checker/api/comments/restaurant', {
        method: 'POST',
        body: formData,
        headers: {
            'Content-type': 'multipart/form data'
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log(data);
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

showComment.onclick = () => {
    (largeCommentBox.style.display === 'none') ? largeCommentBox.style.display = 'flex': largeCommentBox.style.display = 'none'
    showComment.innerText == 'Show comments' ? showComment.innerText = 'Hide comments' : showComment.innerText = 'Show comments'
    fetch('../pages/test.json').then((response) => {
        return response.json()
    }).then(data => {
        console.log(data[0].userId)
        // render to comment and sub comment
        largeCommentImg.src = '../images/' + data[0].images[0] 
        largeCommentName.innerText = 'DinhHai'
        largeCommentPoint.innerText = '10'
        largeCommentHeading.innerText = data[0].heading
        largeCommentContent.innerText = data[0].commentInfo

        midCommentImg.src = '../images/' + data[0].subComments[1].images[0] 
        midCommentName.innerText = 'DinhHai-mid'
        midCommentPoint.innerText = '10'
        midCommentHeading.innerText = data[0].subComments[1].heading
        midCommentContent.innerText = data[0].subComments[1].commentInfo

        smallCommentImg.src = '../images/' + data[0].subComments[1].subComments[0].images[0] 
        smallCommentName.innerText = 'DinhHai-small'
        smallCommentPoint.innerText = '10'
        smallCommentHeading.innerText = data[0].subComments[1].subComments[0].heading
        smallCommentContent.innerText = data[0].subComments[1].subComments[0].commentInfo
    }).catch((error) => {
        console.log('rejected ', error)
    })
}
