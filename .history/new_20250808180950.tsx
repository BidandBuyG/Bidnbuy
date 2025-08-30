
    <Routes>
      /</Routes>/" element={<Layout />}>
        <Route index element={<Home />} />
       
        {/* Auth */}

        /</Routes>account-type" element={<AccountTypeSelection />} />

        /</Routes>signup/customer" element={<CustomerSignUp />} />
        /</Routes>login/customer" element={<CustomerLogin />} />

        /</Routes>signup/vendor" element={<VendorSignup />} />
        /</Routes>login/vendor" element={<VendorLogin />} />

        <Route
          path="complete-profile"
          element={<CompleteProfile />}
        />

        <Route
          path="customer-account-verify"
          element={<CustomerAccountVerification />}
        />
        <Route
          path="vendor-account-verify"
          element={<VendorAccountVerification />}
        />
      </Route>

      <Route element={<LayoutWithNavigationHeader />}>
        {/* Vendor Upload */}

        <Route
          path="vendor-upload-product"
          element={<VendorUploadProductForm />}
        />

        {/* Escrow */}

        /</Routes>escrow" element={<Navigate to="/escrow/1" replace />} />
        /</Routes>escrow/:orderId" element={<EscrowStatus />} />
        <Route
          path="escrow/:orderId/received"
          element={<EscrowItemReceived />}
        />
        <Route
          path="escrow/:orderId/payment-released"
          element={<EscrowPaymentReleased />}
        />
        <Route
          path="escrow/:orderId/report-problem"
          element={<EscrowReportProblemForm />}
        />

        {/* Bid Credit and Ledger */}

        /</Routes>bid-credit-top-up" element={<BidCreditTopUp />} />
        /</Routes>add-bid-credit" element={<AddBidCredit />} />
        /</Routes>bid-credit-top-up-success" element={<BidCreditTopUpSuccess />} />

        /</Routes>wallet-ledger" element={<WalletLedger />} />
        /</Routes>bid-credit-ledger" element={<BidCreditLedgerPage />} />
      </Route>

      <Route element={<LayoutWithHeaderFooter />}>
        {/* Products */}
        /</Routes>product-home" element={<ProductHome />} />

        /</Routes>marketplace" element={<Marketplace />} />

        /</Routes>bids-and-auction" element={<BidsAndAuction />} />

        <Route
          path="auction-product-detail"
          element={<AuctionProductDetail />}
        />
      </Route>
    </Routes>
  );
};

export default App;

