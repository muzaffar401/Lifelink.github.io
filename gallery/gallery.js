document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const searchInput = document.getElementById("searchInput");
    const searchInput2 = document.getElementById("searchInput2");
    const sortOptions = document.getElementById("sortOptions");
    let imagesData = [];

    // Fetch the image data from the JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            imagesData = data;
            displayImages(imagesData);

            // Add event listener to the search input
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredData = imagesData.filter(item => item.title.toLowerCase().includes(searchTerm));
                displayImages(filteredData);
            });

            searchInput2.addEventListener('input', () => {
                const searchTerm = searchInput2.value.toLowerCase();
                const filteredData = imagesData.filter(item => item.title.toLowerCase().includes(searchTerm));
                displayImages(filteredData);
            });

            // Add event listener to the sort options
            sortOptions.addEventListener('change', () => {
                const selectedOption = sortOptions.value;
                let sortedData = [...imagesData]; // Copy original data

                if (selectedOption === 'asc') {
                    sortedData.sort((a, b) => a.title.localeCompare(b.title));
                } else if (selectedOption === 'desc') {
                    sortedData.sort((a, b) => b.title.localeCompare(a.title));
                }

                displayImages(sortedData);
            });
        });

    // Function to display images
    function displayImages(images) {
        gallery.innerHTML = '';
        if (images.length > 0) {
            images.forEach(image => {
                const imageElement = document.createElement('div');
                imageElement.className = 'col-md-4 mb-4';
                imageElement.innerHTML = `
                    <div class="card text-center">
                            <div style="overflow: hidden;   ">

                        <img src="${image.imageUrl}" class="card-img-top h-100 w-100" alt="${image.title}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${image.title}</h5>
                        </div>
                    </div>
                `;
                gallery.appendChild(imageElement);
            });
        } else {
            gallery.innerHTML = '<p class="text-center">No images found.</p>';
        }
    }
});

