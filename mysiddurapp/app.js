// Recursive function to fetch subsequent parts of the prayer
function fetchNextPart(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      // Handle the fetched part data here
      console.log(data); // Display the data in the console for demonstration

      // You can process the part data and integrate it with your app functionality
      // For example, you can create <p> tags for each returned data and display them in the HTML

      const mainContentElement = document.getElementById('main-content');

      // Create a <p> element for the current part of the prayer
      const pTag = document.createElement('p');
      pTag.textContent = data.he;

      // Append the <p> element to the main content element
      mainContentElement.appendChild(pTag);

      // Check if there is a next part
      if (data.next) {
        // Fetch the next part recursively
        return fetchNextPart(`https://www.sefaria.org/api/texts/${data.next}`);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the fetch
      console.error('Error fetching part of the prayer:', error);
    });
}

// Fetch Ashkenazi Siddur - Modeh Ani from Sefaria API
fetchNextPart('https://www.sefaria.org/api/texts/Siddur_Ashkenaz%2C_Weekday%2C_Shacharit%2C_Preparatory_Prayers%2C_Modeh_Ani?ven=Artscroll_siddur&lang=bi');
