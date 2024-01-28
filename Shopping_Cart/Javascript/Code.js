window.onload = function () {
  LoadSave();
  UpdateShoppingCart();
  CreateListOfItems();
  UpdateUserAccountInfo();
};
let ItemsArray = [
  { ID: "Item-1", Name: "RX 5500XT Sapphire 8gb", Price: 3000000, Weight: 1000 },
  { ID: "Item-2", Name: "ASUS Z370 plus || TUF", Price: 3500000, Weight: 700 },
  { ID: "Item-3", Name: "XPG SX6000 256gb nvme", Price: 700000, Weight: 100 },
  { ID: "Item-4", Name: "2x8gb Gskill ddr4 3200mh", Price: 1500000, Weight: 200 },
  { ID: "Item-5", Name: "WD 1TB Blue 7200RPM", Price: 1000000, Weight: 300 },
  { ID: "Item-6", Name: "WD 2TB Blue 5200RPM", Price: 1400000, Weight: 300 },
  { ID: "Item-7", Name: "i3 9100F tray", Price: 2500000, Weight: 150 },
  { ID: "Item-8", Name: "Benq 1080p 60hz", Price: 3000000, Weight: 2000 },
  { ID: "Item-9", Name: "Logitech G102", Price: 250000, Weight: 400 },
  { ID: "Item-10", Name: "A4tech bloody B188", Price: 300000, Weight: 450 },
  { ID: "Item-11", Name: "PSU Green 650W Gold", Price: 2000000, Weight: 1500 },
  { ID: "Item-12", Name: "Mercusis 300 USB Dongle", Price: 200000, Weight: 50 },
  { ID: "Item-13", Name: "Green Evo Plus Case", Price: 500000, Weight: 800 },
];
let UserAccount = {
  Name: "Arash",
  LastName: "Dehdashti",
  Addres: "Iran,Dehdash bozorg",
  Money: 18000000,
};
let UserCart = [];
let ShoppingCart = {
  ItemsCost: 0,
  ItemsCount: 0,
  ItemsWeight: 0,
  ShipmentCost: 0,
};
function UpdateUserAccountInfo() {
  let UserFullName = document.getElementById("user-full-name");
  let UserAddres = document.getElementById("user-addres");
  let UserMoney = document.getElementById("user-money");
  UserFullName.innerText = `Full name : ${UserAccount.Name} ${UserAccount.LastName}`;
  UserAddres.innerText = `Addres : ${UserAccount.Addres}`;
  UserMoney.innerText = `Money : ${UserAccount.Money}`;
}
function CreateListOfItems() {
  let ItemsList = document.getElementById("items-list");
  ItemsArray.forEach((Item) => {
    let ItemElement = document.createElement("section");
    ItemElement.className = "item";
    ItemsList.appendChild(ItemElement);
    let AddToCartButton = document.createElement("button");
    AddToCartButton.id = Item.ID;
    AddToCartButton.className = "add-to-cart-button";
    AddToCartButton.innerHTML = "<img src='Icons/ShoppingIcon.png'>";
    AddToCartButton.addEventListener("click", () => {
      AddToCart(Item.ID);
    });
    ItemElement.appendChild(AddToCartButton);
    let ItemInfoContainer = document.createElement("section");
    ItemInfoContainer.className = "item-info-container";
    ItemElement.appendChild(ItemInfoContainer);
    let Name = document.createElement("h2");
    Name.className = "item-name";
    Name.innerText = Item.Name;
    ItemInfoContainer.appendChild(Name);
    let Price = document.createElement("span");
    Price.className = "item-price";
    Price.innerText = `${Item.Price} T`;
    ItemInfoContainer.appendChild(Price);
  });
}
function UpdateShoppingCart() {
  const CartItemsList = document.getElementById("cart-items-list");
  const CartItemsCount = document.getElementById("cart-items-count");
  const CartItemsCost = document.getElementById("cart-items-cost");
  const ShipmentCost = document.getElementById("shipment-cost");
  const TotalCost = document.getElementById("total-cost");
  CartItemsList.innerHTML = "";
  UserCart.forEach((Item) => {
    let ItemElement = document.createElement("section");
    ItemElement.className = "item";
    CartItemsList.appendChild(ItemElement);
    let RemoveFromCartButton = document.createElement("button");
    RemoveFromCartButton.id = Item.ID;
    RemoveFromCartButton.className = "remove-from-cart-button";
    RemoveFromCartButton.innerHTML = "<img src='Icons/TrashBinIcon.png'>";
    RemoveFromCartButton.addEventListener("click", () => {
      RemoveFromCart(Item.ID);
    });
    ItemElement.appendChild(RemoveFromCartButton);
    let ItemInfoContainer = document.createElement("section");
    ItemInfoContainer.className = "item-info-container";
    ItemElement.appendChild(ItemInfoContainer);
    let Name = document.createElement("h2");
    Name.className = "item-name";
    Name.innerText = Item.Name;
    ItemInfoContainer.appendChild(Name);
    let Price = document.createElement("span");
    Price.className = "item-price";
    Price.innerText = `${Item.Price} T`;
    ItemInfoContainer.appendChild(Price);
  });
  CartItemsCount.innerText = `You have ${UserCart.length} items`;
  CartItemsCost.innerText = `Items cost :  ${CalcItemsCost()} T`;
  if (CalcShipmentCost() !== 0) ShipmentCost.innerText = `Shipment cost :  ${CalcShipmentCost()} T`;
  else ShipmentCost.innerText = `Shipment cost : Free`;
  TotalCost.innerText = `Total cost :  ${CalcItemsCost() + CalcShipmentCost()} T`;
}
function AddToCart(ID) {
  let DoesItemExist = UserCart.some((Item) => {
    return Item.ID === ID;
  });
  if (DoesItemExist) return;
  let Index = ItemsArray.findIndex((Item) => {
    return Item.ID === ID;
  });
  UserCart.push(ItemsArray[Index]);
  localStorage.setItem("UserCart", JSON.stringify(UserCart));
  UpdateShoppingCart();
}
function RemoveFromCart(ID) {
  let Item = UserCart.find((Item) => {
    return Item.ID === ID;
  });
  if (!Item) return;
  console.log(Item);
  let Index = UserCart.findIndex((Item) => {
    return Item.ID === ID;
  });
  UserCart.splice(Index, 1);
  localStorage.setItem("UserCart", JSON.stringify(UserCart));
  UpdateShoppingCart();
}
function CalcItemsCost() {
  let ItemsCost = 0;
  UserCart.forEach((Item) => {
    ItemsCost += Item.Price;
  });
  ShoppingCart.ItemsCost = ItemsCost;
  return ItemsCost;
}
function CalcShipmentCost() {
  let ItemsWeight = 0;
  UserCart.forEach((Item) => {
    ItemsWeight += Item.Weight;
  });
  ShoppingCart.ItemsWeight = ItemsWeight;
  if (ShoppingCart.ItemsCost >= 10000000) return 0;
  else {
    ShoppingCart.ShipmentCost = Math.floor(ShoppingCart.ItemsWeight / 1000) * 5000;
    return ShoppingCart.ShipmentCost;
  }
}
function LoadSave() {
  if (!localStorage.getItem("UserCart")) return;
  UserCart = JSON.parse(localStorage.getItem("UserCart"));
}
