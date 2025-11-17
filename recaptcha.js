function fakeCheck() {
  const box = document.getElementById("fake-checkbox");

  if (!box.checked) {
    box.checked = true;

    // mimic the "loading" delay
    setTimeout(() => {
      alert("Verification complete ✔️");
    }, 500);
  }
}
