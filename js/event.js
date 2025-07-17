document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault(); //prevent submission if invalid
    try {
        //grab all the input data
        const form = e.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const eventName = form.event.value.trim();
        const dateStr = form.date.value.trim();
        const guests = form.guests.value.trim();
        const message = form.message.value.trim();

        //checks required fields, gives error to user if not filled out
        if (!name || !email || !phone || !dateStr || !guests) {
            throw new Error("Please fill out all required fields!")
        }

        //validate phone, make sure its numbers!!
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(phone)) {
            throw new Error("Phone is not valid.")
        }

        //guests should be minimum 1, max 10, only numbers!!
        const guestCount = parseInt(guests, 10);
        if (isNaN(guestCount) || guestCount < 1 || guestCount > 10) {
            throw new Error("Guest count must be between 1 and 10.")
        }

        //Date has to be only in July, cause we haven't done other months yet
        const selectedDate = new Date(dateStr);
        const minDate = new Date("2025-07-01");
        const maxDate = new Date("2025-07-31");
        if (selectedDate < minDate || selectedDate > maxDate) {
            throw new Error("Date must be within July")
        }

        //alert requirement, if all else doesn't fail and it is sucessful submission
        alert("Reservation submitted successfully! See you soon.");
        form.reset();
    } catch (error) {
        const retry = confirm(`Uh oh! ${error.message} Would you let to try again?`);
    }
});