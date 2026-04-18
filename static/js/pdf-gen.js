const { jsPDF } = window.jspdf;

document.querySelectorAll(".pdf-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const doc = new jsPDF();

    const id = btn.dataset.orderId;
    const sku = btn.dataset.orderSku;
    const product = btn.dataset.orderProduct;
    const quantity = btn.dataset.orderQuantity;
    const price = btn.dataset.orderPrice;
    const phone = btn.dataset.orderPhone;
    const address = btn.dataset.orderAddress;
    const status = btn.dataset.orderStatus;
    const date = btn.dataset.orderDate;
    const customer = btn.dataset.customer;

    // Header
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 35, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("BORDERLAND SHOP", 105, 18, { align: "center" });
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("ORDER RECEIPT", 105, 28, { align: "center" });

    // Reset color
    doc.setTextColor(15, 23, 42);

    // Order number
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Order #${sku}`, 20, 50);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(`Date: ${date}`, 20, 58);

    // Status badge
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 163, 74);
    doc.text(`Status: ${status.toUpperCase()}`, 150, 50);

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(20, 65, 190, 65);

    // Customer info
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Customer Information", 20, 78);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(`Name:`, 20, 88);
    doc.setTextColor(15, 23, 42);
    doc.text(customer, 60, 88);
    doc.setTextColor(71, 85, 105);
    doc.text(`Phone:`, 20, 96);
    doc.setTextColor(15, 23, 42);
    doc.text(phone, 60, 96);
    doc.setTextColor(71, 85, 105);
    doc.text(`Address:`, 20, 104);
    doc.setTextColor(15, 23, 42);
    doc.text(address, 60, 104);

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 112, 190, 112);

    // Order details
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Order Details", 20, 124);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(`Product:`, 20, 134);
    doc.setTextColor(15, 23, 42);
    doc.text(product, 60, 134);
    doc.setTextColor(71, 85, 105);
    doc.text(`Quantity:`, 20, 142);
    doc.setTextColor(15, 23, 42);
    doc.text(quantity, 60, 142);
    doc.setTextColor(71, 85, 105);
    doc.text(`Unit Price:`, 20, 150);
    doc.setTextColor(15, 23, 42);
    doc.text(`${(price / quantity).toFixed(2)} Dhs`, 60, 150);

    // Total box
    doc.setFillColor(220, 252, 231);
    doc.roundedRect(20, 158, 170, 22, 4, 4, "F");
    doc.setTextColor(22, 163, 74);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: ${price} Dhs`, 105, 172, { align: "center" });

    // Footer
    doc.setFillColor(241, 245, 249);
    doc.rect(0, 272, 210, 25, "F");
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("© Kabouwa - BORDERLAND Shop", 105, 282, {
      align: "center",
    });
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 289, {
      align: "center",
    });

    doc.save(
      `Order_${sku}_${customer}_released_in_${new Date().toLocaleDateString()}.pdf`,
    );
  });
});
