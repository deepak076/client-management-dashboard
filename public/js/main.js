document.addEventListener('DOMContentLoaded', function () {
    const newJobSheetButton = document.getElementById('new-job-sheet-button');
    const jobSheetForm = document.getElementById('job-sheet-form');
    const closeFormButton = document.getElementById('close-form');
    const jobDataContainer = document.getElementById('job-data');
    const overlay = document.getElementById('overlay');
    const viewJobSheetForm = document.getElementById('view-job-sheet-form');
    const closeViewFormButton = document.getElementById('close-view-form');

    newJobSheetButton.addEventListener('click', function () {
        jobSheetForm.style.display = 'block';  // Show the form
        overlay.style.display = 'flex'; // Show the overlay
    });

    closeFormButton.addEventListener('click', function () {
        jobSheetForm.style.display = 'none';  // Hide the form
        overlay.style.display = 'none'; // Hide the overlay
    });

    closeViewFormButton.addEventListener('click', function () {
        viewJobSheetForm.style.display = 'none'; // Hide the view form
        overlay.style.display = 'none'; // Hide the overlay
    });

    document.getElementById('create-job-sheet-form').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        fetch('/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                console.log('Job sheet created:', result);
                jobSheetForm.style.display = 'none'; // Hide the form
                overlay.style.display = 'none'; // Hide the overlay
                fetchJobData(); // Update the table with new data
            })
            .catch(err => console.error('Error creating job sheet:', err));
    });

    function fetchJobData() {
        fetch('/api/jobs')
            .then(response => response.json())
            .then(data => {
                jobDataContainer.innerHTML = ''; // Clear existing data
                data.forEach(job => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${job.id}</td>
                        <td>${job.client_id}</td>
                        <td>${job.client_name}</td>
                        <td>${job.contact_info}</td>
                        <td>${job.received_date}</td>
                        <td>${job.inventory_received}</td>
                        <td>${job.reported_issues}</td>
                        <td>${job.assigned_technician}</td>
                        <td>${job.estimated_amount}</td>
                        <td>${job.status}</td>
                        <td>
                            <button class="view-btn" data-id="${job.id}">View</button>
                            <button class="edit-btn" data-id="${job.id}">Edit</button>
                            <button class="delete-btn" data-id="${job.id}">Delete</button>
                        </td>
                    `;
                    jobDataContainer.appendChild(row);
                });
            })
            .catch(err => console.log('Error fetching job sheet data:', err));
    }

    jobDataContainer.addEventListener('click', function (e) {
        const id = e.target.getAttribute('data-id');
        if (e.target.classList.contains('view-btn')) {
            fetch(`/api/jobs/${id}`)
                .then(response => response.json())
                .then(job => {
                    document.getElementById('view-client-id').value = job.client_id;
                    document.getElementById('view-client-name').value = job.client_name;
                    document.getElementById('view-contact-info').value = job.contact_info;
                    document.getElementById('view-received-date').value = job.received_date;
                    document.getElementById('view-inventory-received').value = job.inventory_received;
                    document.getElementById('view-reported-issues').value = job.reported_issues;
                    document.getElementById('view-client-notes').value = job.client_notes;
                    document.getElementById('view-assigned-technician').value = job.assigned_technician;
                    document.getElementById('view-estimated-amount').value = job.estimated_amount;
                    document.getElementById('view-status').value = job.status;

                    document.getElementById('view-job-sheet-form').style.display = 'flex'; // Show the view form
                    document.getElementById('overlay').style.display = 'flex'; // Show the overlay
                })
                .catch(err => console.error('Error fetching job sheet details:', err));
        } else if (e.target.classList.contains('edit-btn')) {
            alert(`Editing job sheet for ID: ${id}`);
        } else if (e.target.classList.contains('delete-btn')) {
            if (confirm('Are you sure you want to delete this job sheet?')) {
                alert(`Deleted job sheet for ID: ${id}`);
                // You'd remove the entry from the server here
            }
        }
    });

    // Initial load of job data
    fetchJobData();
});
