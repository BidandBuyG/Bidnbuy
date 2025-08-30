
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
       
        {/* Auth */}

        <Route path="account-type" element={<AccountTypeSelection />} />

        <Route path="signup/customer" element={<CustomerSignUp />} />
        <Route path="login/customer" element={<CustomerLogin />} />

        <Route path="signup/vendor" element={<VendorSignup />} />
        <Route path="login/vendor" element={<VendorLogin />} />

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

        <Route path="escrow" element={<Navigate to="/escrow/1" replace />} />
        <Route path="escrow/:orderId" element={<EscrowStatus />} />
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

        <Route path="bid-credit-top-up" element={<BidCreditTopUp />} />
        <Route path="add-bid-credit" element={<AddBidCredit />} />
        <Route path="bid-credit-top-up-success" element={<BidCreditTopUpSuccess />} />

        <Route path="wallet-ledger" element={<WalletLedger />} />
        <Route path="bid-credit-ledger" element={<BidCreditLedgerPage />} />
      </Route>

      <Route element={<LayoutWithHeaderFooter />}>
        {/* Products */}
        <Route path="product-home" element={<ProductHome />} />

        <Route path="marketplace" element={<Marketplace />} />

        <Route path="bids-and-auction" element={<BidsAndAuction />} />

        <Route
          path="auction-product-detail"
          element={<AuctionProductDetail />}
        />
      </Route>
    </Routes>
  );
};

export default App;

