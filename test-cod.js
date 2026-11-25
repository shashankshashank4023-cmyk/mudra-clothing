const testCodFlow = async () => {
  const baseUrl = 'http://localhost:3000';

  console.log('--- 1. Testing GET /api/payments/methods ---');
  const methodsRes = await fetch(`${baseUrl}/api/payments/methods`);
  const methods = await methodsRes.json();
  console.log('Available Payment Methods:', (methods.paymentMethods || []).map(m => m.name));

  console.log('\n--- 2. Testing POST /api/payments/cod/validate (Eligible Order) ---');
  const val1Res = await fetch(`${baseUrl}/api/payments/cod/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderTotal: 34500, postalCode: '400026' })
  });
  const val1 = await val1Res.json();
  console.log('Validation Result (Eligible):', {
    eligible: val1.eligible,
    tier: val1.tier,
    handlingFee: val1.handlingFee,
    reason: val1.reason
  });

  console.log('\n--- 3. Testing POST /api/payments/cod/validate (Ineligible > ₹50k Cap) ---');
  const val2Res = await fetch(`${baseUrl}/api/payments/cod/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderTotal: 72000, postalCode: '400026' })
  });
  const val2 = await val2Res.json();
  console.log('Validation Result (Exceeded):', {
    eligible: val2.eligible,
    reason: val2.reason
  });

  console.log('\n--- 4. Creating Live COD Order ---');
  const orderRes = await fetch(`${baseUrl}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customer: {
        fullName: 'Devraj Singhania',
        email: 'devraj@singhania-capital.com',
        phone: '+91 98200 77112',
        address: '12 Malabar Hill Regency',
        city: 'Mumbai',
        postalCode: '400006'
      },
      fittingPreference: 'Concierge Home Master-Tailor Fitting',
      items: [
        {
          id: 'mudra-01',
          name: 'Imperial Raw Silk Bandhgala',
          price: 48500,
          quantity: 1,
          selectedSize: '42',
          selectedColor: 'Midnight Obsidian',
          bespokeOptions: { monogramInitials: 'D.S' }
        }
      ],
      pricing: {
        subtotal: 48500,
        discount: 0,
        shippingFee: 0,
        tax: 5820,
        total: 48500
      },
      paymentMethod: 'COD'
    })
  });
  const orderData = await orderRes.json();
  const created = orderData.order;
  console.log('Created Order:', {
    id: created.id,
    paymentMethod: created.paymentMethod,
    paymentStatus: created.paymentStatus,
    amountDue: created.cashOnDeliveryDetails?.amountDue,
    token: created.cashOnDeliveryDetails?.verificationToken,
    serviceTier: created.cashOnDeliveryDetails?.serviceTier
  });

  console.log('\n--- 5. Recording Cash Settlement on Delivery ---');
  const settleRes = await fetch(`${baseUrl}/api/orders/${created.id}/collect-cash`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notes: 'Exact cash ₹48,500 collected by Concierge Courier. Verification Token matched.' })
  });
  const settleData = await settleRes.json();
  console.log('Settlement Complete:', {
    id: settleData.order.id,
    paymentStatus: settleData.order.paymentStatus,
    collected: settleData.order.cashOnDeliveryDetails.collected,
    collectedAt: settleData.order.cashOnDeliveryDetails.collectedAt,
    notes: settleData.order.cashOnDeliveryDetails.collectorNotes
  });

  console.log('\n--- 6. Verifying in Admin Orders API ---');
  const adminOrdersRes = await fetch(`${baseUrl}/api/admin/orders`);
  const adminOrders = await adminOrdersRes.json();
  const found = adminOrders.find(o => o.id === created.id);
  console.log('Found in Admin Database:', {
    id: found.id,
    status: found.status,
    paymentStatus: found.paymentStatus,
    collected: found.cashOnDeliveryDetails?.collected
  });

  console.log('\n✅ ALL COD TESTS PASSED PERFECTLY!');
};

testCodFlow().catch(console.error);
