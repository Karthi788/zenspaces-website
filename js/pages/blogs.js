document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            blogPosts.forEach(post => {
                if (category === 'all') {
                    post.style.display = 'block';
                } else if (post.classList.contains(category)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
});