const toCurrency = (price) => {
  return new Intl.NumberFormat("en-EN", {
    currency: "usd",
    style: "currency",
  }).format(price);
};

document.querySelectorAll(".price").forEach((node) => {
  node.textContent = toCurrency(node.textContent);
});

const $card = document.querySelector("#card");
if ($card) {
  $card.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-remove")) {
      const id = event.target.dataset.id;
      console.log(id);

      fetch(`/card/remove/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.courses.length) {
            const html = card.courses
              .map((c) => {
                return `
                <tr>
                  <td>${с.title}</td>
                  <td>${с.count}</td>
                  <td>
                    <button
                      class="btn btn-small js-remove"
                      data-id="${с.id}"
                    >Remove</button>
                  </td>
                </tr>
              `;
              })
              .join("");
            $card.querySelector("tbode").innerHTML = html;
            $card.querySelector(".price").textContent = toCurrency(card.price);
          } else {
            $card.innerHTML = <p>Card is empty!</p>;
          }
        });
    }
  });
}
