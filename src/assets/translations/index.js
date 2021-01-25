export const generateTs = t => {
  const hello = t('hello');
  const currency = t('Currency');
  const ItemsAreRequired = t('IAR')

  const welcome = t('src.screens.WelcomeScreen.W');
  const toUrbanOS = t('src.screens.WelcomeScreen.TU');
  const withUrbanOS = t('src.screens.WelcomeScreen.WUACAI');
  const LetsBegin = t('src.screens.WelcomeScreen.LB');

  const slide1Title = t('src.screens.OnboardingScreen.slide1Title');
  const slide1Description = t('src.screens.OnboardingScreen.slide1Description');
  const next = t('src.screens.OnboardingScreen.N');
  const slide2Title = t('src.screens.OnboardingScreen.slide2Title');
  const slide2Description = t('src.screens.OnboardingScreen.slide2Description');
  const slide3Title = t('src.screens.OnboardingScreen.slide3Title');
  const slide3Description = t('src.screens.OnboardingScreen.slide3Description');
  const getStarted = t('src.screens.OnboardingScreen.GS');

  const loginWelcome = t('src.screens.auth.LoginScreen.W');
  const pleaseLogIn = t('src.screens.auth.LoginScreen.PLITC');
  const loginId = t('src.screens.auth.LoginScreen.I');
  const loginPassword = t('src.screens.auth.LoginScreen.P');
  const forgot = t('src.screens.auth.LoginScreen.FIOP');
  const logIn = t('src.screens.auth.LoginScreen.LI');
  const termsNConditions = t('src.screens.auth.LoginScreen.TNC');
  const onlineRegistration = t('src.screens.auth.LoginScreen.OR');
  const logInWrong = t('src.screens.auth.LoginScreen.YETWLC');
  const loginClose = t('src.screens.auth.LoginScreen.C');
  const itemRequired = t('src.screens.auth.LoginScreen.IWAR');
  const accountPending = t('src.screens.auth.LoginScreen.ACCOUNT_PENDING');
  const accountRejected = t('src.screens.auth.LoginScreen.ACCOUNT_REJECTED');
  const passMismatch = t('src.screens.auth.LoginScreen.PASSMISMATCH');


  const findIdOrPass = t('src.screens.auth.FindIDAndPasswordScreen.FIOP');
  const pleaseSelect = t('src.screens.auth.FindIDAndPasswordScreen.STSTF');
  const findIdId = t('src.screens.auth.FindIDAndPasswordScreen.I');
  const findIdPassword = t('src.screens.auth.FindIDAndPasswordScreen.P');
  const apartmentName = t('src.screens.auth.FindIDAndPasswordScreen.AN');
  const block = t('src.screens.auth.FindIDAndPasswordScreen.B');
  const findIdFullName = t('src.screens.auth.FindIDAndPasswordScreen.FN');
  const findIdPhone = t('src.screens.auth.FindIDAndPasswordScreen.Ph');
  const findIDCancel = t('src.screens.auth.FindIDAndPasswordScreen.C');
  const getOTP = t('src.screens.auth.FindIDAndPasswordScreen.GO');

  const i18nFindID = t('src.screens.auth.FindIDScreen.FI');
  const i18nFindIDOSADTPYP = t('src.screens.auth.FindIDScreen.OSADTPYP');

  const i18nOtpDRAC = t('src.screens.auth.OtpVerificationScreen.DRAC');
  const i18nOtpEOST = t('src.screens.auth.OtpVerificationScreen.EOST');
  const i18nOtpRN = t('src.screens.auth.OtpVerificationScreen.RN');
  const i18nOtpV = t('src.screens.auth.OtpVerificationScreen.V');
  const i18nOtpOV = t('src.screens.auth.OtpVerificationScreen.OV');
  const i18nOtpOYEAWO = t('src.screens.auth.OtpVerificationScreen.OYEAWO');
  const i18nOtpOYROOT = t('src.screens.auth.OtpVerificationScreen.OYROOT');
  const i18nOtpC = t('src.screens.auth.OtpVerificationScreen.C');
  const i18nOtpYIHBSV = t('src.screens.auth.OtpVerificationScreen.YIHBSV');
  const i18nOtpS = t('src.screens.auth.OtpVerificationScreen.OTPS');
  const i18nOtpR = t('src.screens.auth.OtpVerificationScreen.ROTP');

  const i18nSearchApartment= t('src.screens.auth.SearchApartmentScreen.SA');
  const i18nEYAN= t('src.screens.auth.SearchApartmentScreen.EYAN');
  const i18nAP= t('src.screens.auth.SearchApartmentScreen.AP');

  const i18nRegisterItemRequired = t('src.screens.auth.RegisterScreen.IWARTB');
  const i18nRegisterPleaseFill = t('src.screens.auth.RegisterScreen.PFIATR');
  const i18nRegisterFirstName = t('src.screens.auth.RegisterScreen.FiN');
  const i18nRegisterLastName = t('src.screens.auth.RegisterScreen.LaN');
  const i18nRegisterCountryOfOrigin = t('src.screens.auth.RegisterScreen.COO');
  const i18nRegisterGender = t('src.screens.auth.RegisterScreen.Gender');
  const i18nRegisterMale = t('src.screens.auth.RegisterScreen.Ma');
  const i18nRegisterFemale = t('src.screens.auth.RegisterScreen.Fa');
  const i18nRegisterOther = t('src.screens.auth.RegisterScreen.Ot');
  const i18nRegisterDOB = t('src.screens.auth.RegisterScreen.DOB');
  const i18nRegisterPhone = t('src.screens.auth.RegisterScreen.Ph');
  const i18nRegisterEmail = t('src.screens.auth.RegisterScreen.Em');
  const i18nRegisterPass = t('src.screens.auth.RegisterScreen.Pass');
  const i18nRegisterConfPass = t('src.screens.auth.RegisterScreen.ConfPass');
  const i18nRegisterIdPassportNo = t('src.screens.auth.RegisterScreen.IPN');
  const i18nRegisterUnitInformation = t('src.screens.auth.RegisterScreen.UnI');
  const i18nRegisterApartmentName = t('src.screens.auth.RegisterScreen.AN');
  const i18nRegisterBlock = t('src.screens.auth.RegisterScreen.Bl');
  const i18nRegisterUnit = t('src.screens.auth.RegisterScreen.Un');
  const i18nRegisterRe = t('src.screens.auth.RegisterScreen.Re');
  const i18nRegisterBu = t('src.screens.auth.RegisterScreen.Bu');
  const i18nRegisterTo = t('src.screens.auth.RegisterScreen.To');
  const i18nRegisterAttachIPImages = t('src.screens.auth.RegisterScreen.AIPI');
  const i18nRegisterAttachCImages = t('src.screens.auth.RegisterScreen.ACI');
  const i18nRegisterCancel = t('src.screens.auth.RegisterScreen.Ca');
  const i18nRegisterConfirmation = t('src.screens.auth.RegisterScreen.Ction');
  const i18nRegisterOnlineRegister = t('src.screens.auth.RegisterScreen.OR');
  const i18nRegisterPleaseMakeSure = t(
    'src.screens.auth.RegisterScreen.PMSATI',
  );
  const i18nRegisterFullName = t('src.screens.auth.RegisterScreen.FuN');
  const i18nRegisterApartment = t('src.screens.auth.RegisterScreen.Ap');
  const i18nRegisterConfirm = t('src.screens.auth.RegisterScreen.Co');
  const i18nRegisterEdit = t('src.screens.auth.RegisterScreen.Ed');
  const i18nRegisterRequestSent = t('src.screens.auth.RegisterScreen.RS');
  const i18nRegisterBackToLogin = t('src.screens.auth.RegisterScreen.BTL');
  const i18nRegisterWeHaveReceived = t(
    'src.screens.auth.RegisterScreen.WHRYRA',
  );
  const under18 = t('src.screens.auth.RegisterScreen.UNDER18');
  const i18nRegisterLengthPhoneWrong = t('src.screens.auth.RegisterScreen.LengthPhoneWrong');
  const i18nRegisterFormatPhoneWrong = t('src.screens.auth.RegisterScreen.FormatPhoneWrong');
  const i18nRegisterFormatEmailWrong = t('src.screens.auth.RegisterScreen.FormatEmailWrong');
  const i18nRegisterPassowrdWrong = t('src.screens.auth.RegisterScreen.PassowrdWrong');
  const i18nRegisterRA = t('src.screens.auth.RegisterScreen.RA');
  const i18nRegisterSE = t('src.screens.auth.RegisterScreen.SE');
  const i18nRegisterPSYAASYPN = t('src.screens.auth.RegisterScreen.PSYAASYPN');
  const i18nResetPassword = t(
    'src.screens.auth.ResetPasswordScreen.RP',
  );
  const i18nResetPasswordYHSUYP = t(
    'src.screens.auth.ResetPasswordScreen.YHSUYP',
  );
  const i18nResetPasswordBTL = t(
    'src.screens.auth.ResetPasswordSuccessScreen.BTL',
  );
  const i18nNewPassword = t(
    'src.screens.auth.ResetPasswordScreen.NP',
  );
  const i18nConfirmPassword = t(
    'src.screens.auth.ResetPasswordScreen.CNP',
  );
  const i18nResetPasswordYPMCAM = t(
    'src.screens.auth.ResetPasswordScreen.YPMCAM',
  );
  const i18nResetPasswordSave = t(
    'src.screens.auth.ResetPasswordScreen.S',
  );
  const i18nResetPasswordCancel = t(
    'src.screens.auth.ResetPasswordScreen.Cancel',
  );
  const i18nResetPasswordMNPACNPF = t(
    'src.screens.auth.ResetPasswordScreen.MNPACNPF',
  );

  const i18nHomeHello = t('src.screens.HomeScreen.He');
  const i18nHomeProfile = t('src.screens.HomeScreen.Pr');
  const i18nHomePoints = t('src.screens.HomeScreen.Po');
  const i18nHomeContactSupportTeam = t('src.screens.HomeScreen.CST');
  const i18nHomeBill = t('src.screens.HomeScreen.Bi');
  const i18nHomeFacility = t('src.screens.HomeScreen.Fa');
  const i18nHomeTicket = t('src.screens.HomeScreen.Ti');
  const i18nHomePhoneBook = t('src.screens.HomeScreen.PB');
  const i18nHomeHomeService = t('src.screens.HomeScreen.HS');
  const i18nHomeElection = t('src.screens.HomeScreen.El');
  const i18nHomeVisitor = t('src.screens.HomeScreen.Vi');
  const i18nHomeMoving = t('src.screens.HomeScreen.Mo');
  const i18nHomeEvent = t('src.screens.HomeScreen.Ev');
  const i18nHomeYTIC = t('src.screens.HomeScreen.YTIC')
  const i18nHomePSYU = t('src.screens.HomeScreen.PSYU');
  const i18nSettingMo = t('src.screens.other.SettingScreen.Mo');
  const i18nSettingNo = t('src.screens.other.SettingScreen.No');
  const i18nSettingNS = t('src.screens.other.SettingScreen.NS');
  const i18nSettingSu = t('src.screens.other.SettingScreen.Su');
  const i18nSettingAn = t('src.screens.other.SettingScreen.An');
  const i18nSettingCS = t('src.screens.other.SettingScreen.CS');
  const i18nSettingSe = t('src.screens.other.SettingScreen.Se');
  const i18nSettingAc = t('src.screens.other.SettingScreen.Ac');
  const i18nSettingPr = t('src.screens.other.SettingScreen.Pr');
  const i18nSettingCP = t('src.screens.other.SettingScreen.CP');
  const i18nSettingEl = t('src.screens.other.SettingScreen.El');
  const i18nSettingLa = t('src.screens.other.SettingScreen.La');
  const i18nSettingEn = t('src.screens.other.SettingScreen.En');
  const i18nSettingVi = t('src.screens.other.SettingScreen.Vi');
  const i18nSettingLo = t('src.screens.other.SettingScreen.Lo');
  const i18nSettingGB = t('src.screens.other.SettingScreen.GB');
  const i18nSettingAskLo = t('src.screens.other.SettingScreen.AskLo');

  const i18nAnnounceNo = t('src.screens.other.Announcement.No');
  const i18nAnnounceMAAR = t('src.screens.other.Announcement.MAAR');

  const i18nNotificationSettingBi = t(
    'src.screens.other.NotificationSettingScreen.Bi',
  );
  const i18nNotificationSettingBo = t(
    'src.screens.other.NotificationSettingScreen.Bo',
  );
  const i18nNotificationSettingTi = t(
    'src.screens.other.NotificationSettingScreen.Ti',
  );
  const i18nNotificationSettingML = t(
    'src.screens.other.NotificationSettingScreen.ML',
  );
  const i18nNotificationSettingEv = t(
    'src.screens.other.NotificationSettingScreen.Ev',
  );
  const i18nNotificationSettingAn = t(
    'src.screens.other.NotificationSettingScreen.An',
  );
  const i18nNotificationSettingSa = t(
    'src.screens.other.NotificationSettingScreen.Sa',
  );

  const i18nCsSupportScreenSu = t('src.screens.other.CsSupportScreen.Su');
  const i18nCsSupportScreenHO = t('src.screens.other.CsSupportScreen.HO');
  const i18nCsSupportScreenHL = t('src.screens.other.CsSupportScreen.HL');
  const i18nCsSupportScreenEm = t('src.screens.other.CsSupportScreen.Em');
  const i18nCsSupportScreenFAQ = t('src.screens.other.CsSupportScreen.FAQ');
  const i18nCsSupportScreenAl = t('src.screens.other.CsSupportScreen.Al');

  const i18nCsSupportScreenWIIIT = t('src.screens.other.CsSupportScreen.WIIIT');
  const i18nCsSupportScreenWIIITC = t(
    'src.screens.other.CsSupportScreen.WIIITC',
  );
  const i18nCsSupportScreenAIATSR = t(
    'src.screens.other.CsSupportScreen.AIATSR',
  );
  const i18nCsSupportScreenNTINAP = t(
    'src.screens.other.CsSupportScreen.NTINAP',
  );
  const i18nCsSupportScreenHDISMR = t(
    'src.screens.other.CsSupportScreen.HDISMR',
  );
  const i18nCsSupportScreenYRASBD = t(
    'src.screens.other.CsSupportScreen.YRASBD',
  );
  const i18nCsSupportScreenIIATAS = t(
    'src.screens.other.CsSupportScreen.IIATAS',
  );
  const i18nCsSupportScreenNTINAI = t(
    'src.screens.other.CsSupportScreen.NTINAI',
  );
  const i18nCsSupportScreenCICMAI = t(
    'src.screens.other.CsSupportScreen.CICMAI',
  );
  const i18nCsSupportScreenYYCCAP = t(
    'src.screens.other.CsSupportScreen.YYCCAP',
  );
  const i18nCsSupportScreenCILITS = t(
    'src.screens.other.CsSupportScreen.CILITS',
  );
  const i18nCsSupportScreenWYCLIT = t(
    'src.screens.other.CsSupportScreen.WYCLIT',
  );
  const i18nCsSupportScreenIDWTRE = t(
    'src.screens.other.CsSupportScreen.IDWTRE',
  );
  const i18nCsSupportScreenYCOOOE = t(
    'src.screens.other.CsSupportScreen.YCOOOE',
  );
  const i18nCsSupportScreenDYWTETST = t(
    'src.screens.other.CsSupportScreen.DYWTETST',
  );
  const i18nCsSupportScreenCSC = t(
    'src.screens.other.CsSupportScreen.CSC',
  );
  const i18nCsSupportScreenCancel = t(
    'src.screens.other.CsSupportScreen.Cancel',
  );
  const i18nCsSupportScreenCall = t(
    'src.screens.other.CsSupportScreen.Call',
  );

  const i18nProfileSettingPD = t('src.screens.profile.ProfileSettingScreen.PD');
  const i18nProfileSettingBC = t('src.screens.profile.ProfileSettingScreen.BC');
  const i18nProfileSettingMe = t('src.screens.profile.ProfileSettingScreen.Me');
  const i18nProfileSettingVI = t('src.screens.profile.ProfileSettingScreen.VI');
  const i18nProfileSettingAd = t('src.screens.profile.ProfileSettingScreen.Ad');
  const i18nProfileSettingCI = t('src.screens.profile.ProfileSettingScreen.CI');
  const i18nProfileSettingRT = t('src.screens.profile.ProfileSettingScreen.RT');
  const i18nProfileSettingBi = t('src.screens.profile.ProfileSettingScreen.Bi');
  const i18nProfileSettingU = t('src.screens.profile.ProfileSettingScreen.U');
  const i18nProfileSettingMot = t(
    'src.screens.profile.ProfileSettingScreen.Mot',
  );
  const i18nProfileSetting4 = t('src.screens.profile.ProfileSettingScreen.4');
  const i18nProfileSetting7 = t('src.screens.profile.ProfileSettingScreen.7');

  const i18nAddMemberAM = t('src.screens.profile.AddMemberScreen.AM');
  const i18nAddMemberPFOTRF = t('src.screens.profile.AddMemberScreen.PFOTRF');
  const i18nAddMemberUN = t('src.screens.profile.AddMemberScreen.UN');
  const i18nAddMemberFiN = t('src.screens.profile.AddMemberScreen.FiN');
  const i18nAddMemberLaN = t('src.screens.profile.AddMemberScreen.LaN');
  const i18nAddMemberCo = t('src.screens.profile.AddMemberScreen.Co');
  const i18nAddMemberGe = t('src.screens.profile.AddMemberScreen.Ge');
  const i18nAddMemberMa = t('src.screens.profile.AddMemberScreen.Ma');
  const i18nAddMemberFe = t('src.screens.profile.AddMemberScreen.Fe');
  const i18nAddMemberDOB = t('src.screens.profile.AddMemberScreen.DOB');
  const i18nAddMemberPh = t('src.screens.profile.AddMemberScreen.Ph');
  const i18nAddMemberEm = t('src.screens.profile.AddMemberScreen.Em');
  const i18nAddMemberIPN = t('src.screens.profile.AddMemberScreen.IPN');
  const i18nAddMemberAICIBD = t('src.screens.profile.AddMemberScreen.AICIBD');
  const i18nAddMemberCa = t('src.screens.profile.AddMemberScreen.Ca');
  const i18nAddMemberAp = t('src.screens.profile.AddMemberScreen.Ap');

  const i18nAddVehicleAV = t('src.screens.profile.AddVehicleScreen.AV');
  const i18nAddVehiclePFIAIB = t('src.screens.profile.AddVehicleScreen.PFIAIB');
  const i18nAddVehicleTy = t('src.screens.profile.AddVehicleScreen.Ty');
  const i18nAddVehicleBi = t('src.screens.profile.AddVehicleScreen.Bi');
  const i18nAddVehicleMo = t('src.screens.profile.AddVehicleScreen.Mo');
  const i18nAddVehicle4 = t('src.screens.profile.AddVehicleScreen.4');
  const i18nAddVehicle7 = t('src.screens.profile.AddVehicleScreen.7');
  const i18nAddVehicleBr = t('src.screens.profile.AddVehicleScreen.Br');
  const i18nAddVehiclePN = t('src.screens.profile.AddVehicleScreen.PN');
  const i18nAddVehiclePPM = t('src.screens.profile.AddVehicleScreen.PPM');
  const i18nAddVehicleAI = t('src.screens.profile.AddVehicleScreen.AI');
  const i18nAddVehicleSa = t('src.screens.profile.AddVehicleScreen.Sa');
  const i18nAddVehicleSS = t('src.screens.profile.AddVehicleScreen.SS');
  const i18nAddVehicleSFD = t('src.screens.profile.AddVehicleScreen.SFD');

  const i18nViewProfileVP = t('src.screens.profile.ViewProfileScreen.VP');
  const i18nViewProfileFuN = t('src.screens.profile.ViewProfileScreen.FuN');
  const i18nViewProfileEm = t('src.screens.profile.ViewProfileScreen.Em');
  const i18nViewProfilePh = t('src.screens.profile.ViewProfileScreen.Ph');
  const i18nViewProfileCOO = t('src.screens.profile.ViewProfileScreen.COO');
  const i18nViewProfileGe = t('src.screens.profile.ViewProfileScreen.Ge');
  const i18nViewProfileDOB = t('src.screens.profile.ViewProfileScreen.DOB');
  const i18nViewProfileRo = t('src.screens.profile.ViewProfileScreen.Ro');
  const i18nViewProfilePOR = t('src.screens.profile.ViewProfileScreen.POR');
  const i18nViewProfileIPI = t('src.screens.profile.ViewProfileScreen.IPI');
  const i18nViewProfileCP = t('src.screens.profile.ViewProfileScreen.CP');
  const i18nViewProfileMa = t('src.screens.profile.ViewProfileScreen.Ma');
  const i18nViewProfileFe = t('src.screens.profile.ViewProfileScreen.Fe');
  const i18nViewProfileHT = t('src.screens.profile.ViewProfileScreen.HT');
  const i18nViewProfileTe = t('src.screens.profile.ViewProfileScreen.Te');
  const i18nViewProfileOHTCUT = t('src.screens.profile.ProfileSettingScreen.OHTCUT');

  const i18nChangePasswordCop = t(
    'src.screens.profile.ChangePasswordScreen.CoP',
  );
  const i18nChangePasswordCuP = t(
    'src.screens.profile.ChangePasswordScreen.CuP',
  );
  const i18nChangePasswordNeP = t(
    'src.screens.profile.ChangePasswordScreen.NeP',
  );
  const i18nChangePasswordCPWE= t(
    'src.screens.profile.ChangePasswordScreen.CPWE',
  );
  const i18nChangePasswordMNPW = t(
    'src.screens.profile.ChangePasswordScreen.MNPW',
  );
  const i18nChangePasswordICP = t(
    'src.screens.profile.ChangePasswordScreen.ICP',
  );
  const i18nChangePasswordCoNeP = t(
    'src.screens.profile.ChangePasswordScreen.CoNeP',
  );
  const i18nChangePasswordSa = t('src.screens.profile.ChangePasswordScreen.Sa');
  const i18nChangePassword = t(
    'src.screens.profile.ChangePasswordScreen.PC',
  );
  const i18nChangePasswordYHSUYP = t(
    'src.screens.profile.ChangePasswordScreen.YHSUYP',
  );
  const i18nChangePasswordGTL = t(
    'src.screens.profile.ChangePasswordScreen.GTL',
  );

  //Facility
  const i18nFacility = t('src.screens.facilities.FacilityScreen.Fa')
  const i18nFacilityDes = t('src.screens.facilities.FacilityTennisScreen.YCNRAF')
  const i18nRecentBooking = t('src.screens.facilities.FacilityScreen.RB')
  const i18nPleaseSelect = t('src.screens.facilities.FacilityScreen.PSAFBT')
  const i18nFaNone = t('src.screens.facilities.FacilityScreen.None')
  const i18nFaCancel = t('src.screens.facilities.FacilityScreen.C')
  const i18nFaNB = t('src.screens.facilities.FacilityScreen.NB')
  const i18nFaLGS = t('src.screens.facilities.FacilityScreen.LGS')

  const i18nFaDate = t('src.screens.facilities.Date')
  const i18nFaTime = t('src.screens.facilities.Time')
  const i18nFaPlace = t('src.screens.facilities.Place')
  const i18nFaName = t('src.screens.facilities.Name')
  const i18nFaUnit = t('src.screens.facilities.Unit')
  const i18nFaEmail = t('src.screens.facilities.Email')
  const i18nFaPhone = t('src.screens.facilities.Phone')
  const i18nFaConfirm = t('src.screens.facilities.Co')
  const i18nFaGB = t('src.screens.facilities.GB')

  const i18nFaCed = t('src.screens.facilities.BookingConfirmDoneScreen.Ced')

  const i18nFaBookingConfirm = t('src.screens.facilities.BookingConfirmScreen.BC')
  const i18nFaAgree = t('src.screens.facilities.BookingConfirmScreen.ATTFUP')
  const i18nFaUsagePolicy = t('src.screens.facilities.BookingConfirmScreen.FUP')
  const i18nFaAnAuthorization = t('src.screens.facilities.BookingConfirmScreen.AARWBS')
  const i18nFaBookingSuccess = t('src.screens.facilities.BookingConfirmScreen.BS')
  const i18nFaYBHSC = t('src.screens.facilities.BookingConfirmScreen.YBHSC')
  const i18nFaYCCYBD = t('src.screens.facilities.BookingConfirmScreen.YCCYBD')
  const i18nFaPolicy = t('src.screens.facilities.BookingConfirmScreen.Policy')
  const i18nFaClose = t('src.screens.facilities.BookingConfirmScreen.Close')
  const i18nFaYCOCOT = t('src.screens.facilities.BookingConfirmDoneScreen.YCOCOT')
  const i18nFaAYSYWT = t('src.screens.facilities.FacilityScreen.AYSYWT')
  const i18nFaAGR = t('src.screens.facilities.BookingConfirmScreen.AGR')

  const i18nSchedule = t('src.screens.facilities.FacilityScheduleScreen.S')
  const i18nScheduleBooked = t('src.screens.facilities.FacilityScheduleScreen.Booked')
  const i18nScheduleAvailable = t('src.screens.facilities.FacilityScheduleScreen.A')
  const i18nScheduleBooking = t('src.screens.facilities.FacilityScheduleScreen.Booking')
  const i18nScheduleAm = t('src.screens.facilities.FacilityScheduleScreen.Am')
  const i18nSchedulePm = t('src.screens.facilities.FacilityScheduleScreen.Pm')

  //Phone Book
  const i18nPBTitle = t('src.screens.phoneBook.PhoneBookScreen.PB')

  //Bill
  const i18nBill = t('src.screens.bills.BillsScreen.B')
  const i18nBillEB = t('src.screens.bills.BillsScreen.EB')
  const i18nBillGB = t('src.screens.bills.BillsScreen.GB')
  const i18nBillBD = t('src.screens.bills.BillsScreen.BD')
  const i18nBillP = t('src.screens.bills.BillsScreen.P')
  const i18nBillUP = t('src.screens.bills.BillsScreen.UP')
  const i18nBillTotal = t('src.screens.bills.BillsScreen.T')
  const i18nBillVat = t('src.screens.bills.BillsScreen.V')
  const i18nBillDueDate = t('src.screens.bills.BillsScreen.DD')
  const i18nBillIncludeUnpaid = t('src.screens.bills.BillsScreen.IAUA')

  //Ticket
  const i18nTicketEdit = t('src.screens.tickers.Ed')
  const i18nTicketDelete = t('src.screens.tickers.De')
  const i18nTicketConfirm = t('src.screens.tickers.Co')
  const i18nTicketDateTime = t('src.screens.tickers.DTi')
  const i18nTicketName = t('src.screens.tickers.NT')
  const i18nTicketUnit = t('src.screens.tickers.Un')
  const i18nTicketEmail = t('src.screens.tickers.Em')
  const i18nTicketPhone = t('src.screens.tickers.Ph')
  const i18nTicketSkip = t('src.screens.tickers.Sk')
  const i18nTicketSend = t('src.screens.tickers.Se')
  const i18nTicketST= t('src.screens.tickers.ST')

  const i18nTicket = t('src.screens.tickers.TicketScreen.T')
  const i18nTickReportIssue = t('src.screens.tickers.TicketScreen.RAPDOI')
  const i18nTickIntroduce = t('src.screens.tickers.TicketScreen.Introduce')
  const i18nTickHistory = t('src.screens.tickers.TicketScreen.Hi')
  const i18nTicketCreate = t('src.screens.tickers.TicketScreen.CT')
  const i18nTicketTYFYF = t('src.screens.tickers.TicketScreen.TYFYF')
  const i18nTicketTTHBC = t('src.screens.tickers.TicketScreen.TTHBC')
  const i18nTicketCompleted = t('src.screens.tickers.TicketScreen.Completed')
  const i18nTicketET = t('src.screens.tickers.TicketDetailScreen.ET')

  const i18nTicketWDYWTC = t('src.screens.tickers.TicketDetailScreen.WDYWTC')
  const i18nTicketTIIAR = t('src.screens.tickers.TicketDetailScreen.TIIAR')
  const i18nTicketTWTITL = t('src.screens.tickers.TicketDetailScreen.TWTITL')
  const i18nTicketINLNTS = t('src.screens.tickers.TicketDetailScreen.INLNTS')
  const i18nTicketOther= t('src.screens.tickers.TicketDetailScreen.O')
  const i18nTicketHWOS= t('src.screens.tickers.TicketDetailScreen.HWOS')

  const i18nTicketPleaseFillOut = t('src.screens.tickers.CreateTicketScreen.PFOTIB')
  const i18nTicketTitle = t('src.screens.tickers.CreateTicketScreen.Ti')
  const i18nTicketType = t('src.screens.tickers.CreateTicketScreen.Ty')
  const i18nTicketDe = t('src.screens.tickers.CreateTicketScreen.De')
  const i18nTicketAttachImages = t('src.screens.tickers.CreateTicketScreen.AI')
  const i18nTicketSomethingUrgent = t('src.screens.tickers.CreateTicketScreen.SU')
  const i18nTicketCallUs = t('src.screens.tickers.TicketScreen.CU')
  const i18nTicketSave = t('src.screens.tickers.CreateTicketScreen.Sa')
  const i18nTicketCallSupport = t('src.screens.tickers.CreateTicketScreen.DYWTCTS')
  const i18nTicketGoBack = t('src.screens.tickers.CreateTicketScreen.GB')
  const i18nTicketCall = t('src.screens.tickers.CreateTicketScreen.Call')
  const i18nTicketDetail = t('src.screens.tickers.CreateTicketScreen.TD')
  const i18nTicketNotifyService = t('src.screens.tickers.TicketDetailScreen.TSINA')

  const i18nTicketEditTitle = t('src.screens.tickers.EditTicketScreen.ET')

  const i18nTicketRequest = t('src.screens.tickers.TicketConfirmScreen.TR')
  const i18nTicketSendDetail = t('src.screens.tickers.TicketConfirmScreen.YRWBTI')
  const i18nTicketRequestSend = t('src.screens.tickers.TicketConfirmScreen.TS')
  
  //Election
  const i18nElectionEl = t('src.screens.election.ElectionScreen.El')
  const i18nElectionHi = t('src.screens.election.ElectionScreen.Hi')

  const i18nElectionCa = t('src.screens.election.Ca')
  const i18nElectionEC = t('src.screens.election.EC')

  const i18nElectionED = t('src.screens.election.ElectionDetailVoteScreen.ED')
  const i18nElectionDe = t('src.screens.election.ElectionDetailVoteScreen.De')
  const i18nElectionRe = t('src.screens.election.ElectionDetailVoteScreen.Re')
  const i18nElectionTOO = t('src.screens.election.ElectionDetailVoteScreen.TOO')
  const i18nElectionSE = t('src.screens.election.ElectionDetailVoteScreen.SE')
  const i18nElectionTEHE = t('src.screens.election.ElectionDetailVoteScreen.TEHE')
  const i18nElectionES = t('src.screens.election.ElectionDetailVoteScreen.ES')
  const i18nElectionTYFV = t('src.screens.election.ElectionDetailVoteScreen.TYFV')
  const i18nElectionPLFTTUE = t('src.screens.election.ElectionDetailVoteScreen.PLFTTUE')
  const i18nElectionD = t('src.screens.election.ElectionDetailVoteScreen.D')

  const i18nElectionCD = t('src.screens.election.ElectCandidatesScreen.CD')
  const i18nElectionPCYVF = t('src.screens.election.ElectCandidatesScreen.PCYVF')
  const i18nElectionYCCYVA = t('src.screens.election.ElectCandidatesScreen.YCCYVA')
  const i18nElectionYHVF = t('src.screens.election.ElectCandidatesScreen.YHVF')
  const i18nElectionVS = t('src.screens.election.ElectCandidatesScreen.VS')
  const i18nElectionYVHBC = t('src.screens.election.ElectCandidatesScreen.YVHBC')
  const i18nElectionTERWBA = t('src.screens.election.ElectCandidatesScreen.TERWBA')
  const i18nElectionCI = t('src.screens.election.ElectCandidatesScreen.CI')
  const i18nElectionRule = t('src.screens.election.ElectCandidatesScreen.ElectionRule')
  const i18nElectionEmpty = t('src.screens.election.Empty')

  const i18nVisitorVi = t('src.screens.visitor.VisitorScreen.Vi');
  const i18nVisitorLOVI = t('src.screens.visitor.VisitorScreen.LOVI');
  const i18nVisitorHi = t('src.screens.visitor.VisitorScreen.Hi');
  const i18nVisitorOT = t('src.screens.visitor.VisitorScreen.OT');
  const i18nVisitorAV = t('src.screens.visitor.VisitorScreen.AV');
  const i18nVisitorNI = t('src.screens.visitor.VisitorScreen.NI');
  const i18nVisitorCV = t('src.screens.visitor.VisitorScreen.CV');
  const i18nVisitorPh = t('src.screens.visitor.VisitorScreen.Ph');
  const i18nVisitorAIAR = t('src.screens.visitor.VisitorScreen.AIAR');

  const i18nVisitorVI = t('src.screens.visitor.VisitorDetailScreen.VI');
  const i18nVisitorRe = t('src.screens.visitor.VisitorDetailScreen.Re');
  const i18nVisitorNa = t('src.screens.visitor.VisitorDetailScreen.Na');
  const i18nVisitorUn = t('src.screens.visitor.VisitorDetailScreen.Un');
  const i18nVisitorEm = t('src.screens.visitor.VisitorDetailScreen.Em');
  const i18nVisitorDel = t('src.screens.visitor.VisitorDetailScreen.Del');
  const i18nVisitorRes = t('src.screens.visitor.VisitorDetailScreen.Res');
  const i18nVisitorCa = t('src.screens.visitor.VisitorDetailScreen.Ca');
  const i18nVisitorCo = t('src.screens.visitor.VisitorDetailScreen.Co');
  const i18nVisitorDYWTDT = t('src.screens.visitor.VisitorDetailScreen.DYWTDT');
  
  const i18nVisitorCI = t('src.screens.visitor.CreateVisitorScreen.CI');
  const i18nVisitorCO = t('src.screens.visitor.CreateVisitorScreen.CO');
  const i18nVisitorFuN = t('src.screens.visitor.CreateVisitorScreen.FuN');
  const i18nVisitorIPN = t('src.screens.visitor.CreateVisitorScreen.IPN');
  const i18nVisitorDAT = t('src.screens.visitor.CreateVisitorScreen.DAT');
  const i18nVisitorSa = t('src.screens.visitor.CreateVisitorScreen.Sa');

  const i18nVisitorRFV = t('src.screens.visitor.VisitorScreen.RFV');
  const i18nVisitorSc = t('src.screens.visitor.VisitorScreen.Sc');
  const i18nVisitorDo = t('src.screens.visitor.VisitorScreen.Do');

  const i18nVisitorDYWTSA = t('src.screens.visitor.VisitorScreen.DYWTSA');
  const i18nVisitorPFOTIB = t('src.screens.visitor.CreateVisitorScreen.PFOTIB');
  const i18nVisitorSR = t('src.screens.visitor.CreateVisitorScreen.SR');
  const i18nVisitorMDOTV = t('src.screens.visitor.CreateVisitorScreen.MDOTV');
  const i18nVisitorNS = t('src.screens.visitor.VisitorScreen.NS');
  const i18nVisitorTYFIUA = t('src.screens.visitor.VisitorScreen.TYFIUA');
  const i18nVisitorVC = t('src.screens.visitor.VisitorConfirmScreen.VC');
  const i18nVisitorUV = t('src.screens.visitor.VisitorScreen.UV');

  const i18nMovingListMo = t('src.screens.movingList.MovingListScreen.Mo');
  const i18nMovingListCML = t('src.screens.movingList.MovingListScreen.CML');
  const i18nMovingListML = t('src.screens.movingList.MovingListScreen.ML');
  const i18nMovingListPLTITY = t(
    'src.screens.movingList.MovingListScreen.PLTITY',
  );
  const i18nMovingListNDIL = t('src.screens.movingList.MovingListScreen.NDIL');
  const i18nMovingListLGS = t('src.screens.movingList.MovingListScreen.LGS');
  const i18nMovingListCr = t('src.screens.movingList.MovingListScreen.Cr');
  const i18nMovingListDa = t('src.screens.movingList.MovingListScreen.Da');
  const i18nMovingListIt = t('src.screens.movingList.MovingListScreen.It');
  const i18nMovingListTa = t('src.screens.movingList.MovingListScreen.Ta');
  const i18nMovingListCh = t('src.screens.movingList.MovingListScreen.Ch');
  const i18nMovingListSt = t('src.screens.movingList.MovingListScreen.St');
  const i18nMovingListAp = t('src.screens.movingList.MovingListScreen.Ap');
  const i18nMovingListSu = t('src.screens.movingList.MovingListScreen.Su');
  const i18nMovingListRe = t('src.screens.movingList.MovingListScreen.Re');
  const i18nMovingListRD = t('src.screens.movingList.MovingListScreen.RD');
  const i18nMovingListMAF = t('src.screens.movingList.MovingListScreen.MAF');
  const i18nMovingListMO = t('src.screens.movingList.MovingListScreen.MO');
  const i18nMovingListQu = t('src.screens.movingList.MovingListScreen.Qu');
  const i18nMovingListNa = t('src.screens.movingList.MovingListScreen.Na');
  const i18nMovingListUn = t('src.screens.movingList.MovingListScreen.Un');
  const i18nMovingListEm = t('src.screens.movingList.MovingListScreen.Em');
  const i18nMovingListPh = t('src.screens.movingList.MovingListScreen.Ph');
  const i18nMovingListDe = t('src.screens.movingList.MovingListScreen.De');
  const i18nMovingListAI = t('src.screens.movingList.MovingListScreen.AI');
  const i18nMovingListATL = t('src.screens.movingList.MovingListScreen.ATL');
  const i18nMovingListNML = t('src.screens.movingList.MovingListScreen.NML');
  const i18nMovingListSa = t('src.screens.movingList.MovingListScreen.Sa');
  const i18nMovingListDo = t('src.screens.movingList.MovingListScreen.Do');
  const i18nMovingListCl = t('src.screens.movingList.MovingListScreen.Cl');
  const i18nMovingListAARWBS = t(
    'src.screens.movingList.MovingListScreen.AARWBS',
  );
  const i18nMovingListGB = t('src.screens.movingList.MovingListScreen.GB');
  const i18nMovingListCo = t('src.screens.movingList.MovingListScreen.Co');
  const i18nMovingListCL = t('src.screens.movingList.MovingListScreen.CL');
  const i18nMovingListCD = t('src.screens.movingList.MovingListScreen.CD');
  const i18nMovingListPAIOYC = t(
    'src.screens.movingList.MovingListScreen.PAIOYC',
  );
  const i18nMovingListCFL = t('src.screens.movingList.MovingListScreen.CFL');
  const i18nMovingListRS = t('src.screens.movingList.MovingListScreen.RS');
  const i18nMovingListYRWBTI = t(
    'src.screens.movingList.MovingListScreen.YRWBTI',
  );
  const i18nMovingListCP = t('src.screens.movingList.MovingListScreen.CP');
  const i18nMovingListGTH = t('src.screens.movingList.MovingListScreen.GTH');
  const i18nMovingListFu = t('src.screens.movingList.MovingListScreen.Fu');
  const i18nMovingListMoOu = t('src.screens.movingList.MovingListScreen.MoOu');
  const i18nMovingListAIAR = t('src.screens.movingList.MovingListScreen.AIAR');
  const i18nMovingListMd = t('src.screens.movingList.MovingListScreen.Md');
  const i18nMovingListPSATS = t('src.screens.movingList.MovingListScreen.PSATS');
  const i18nMovingListEL = t('src.screens.movingList.MovingListScreen.EL');
  const i18nMovingListPL = t('src.screens.movingList.MovingListScreen.PL');
  const i18nMovingListELS = t('src.screens.movingList.MovingListScreen.ELS');
  const i18nMovingListPLS = t('src.screens.movingList.MovingListScreen.PLS');
  const i18nMovingListSch = t('src.screens.movingList.MovingListScreen.Sch');
  const i18nMovingListBo = t('src.screens.movingList.MovingListScreen.Bo');
  const i18nMovingListS = t('src.screens.movingList.MovingListScreen.S');
  const i18nMovingListB = t('src.screens.movingList.MovingListScreen.B');
  const i18nMovingListC = t('src.screens.movingList.MovingListScreen.C');
  const i18nMovingListCed = t('src.screens.movingList.MovingListScreen.Ced');
  const i18nMovingListSui = t('src.screens.movingList.MovingListScreen.Sui');
  const i18nMovingListAbo = t('src.screens.movingList.MovingListScreen.Abo');
  const i18nMovingListSNTC = t('src.screens.movingList.MovingListScreen.SNTC');
  const i18nMovingListTSSMBC = t('src.screens.movingList.MovingListScreen.TSSMBC');
  const i18nMovingListPMSUOIB = t('src.screens.movingList.MovingListScreen.PMSUOIB');
  const i18nMovingListR = t('src.screens.movingList.MovingListScreen.R');
  const i18nMovingListVM = t('src.screens.movingList.MovingListScreen.VM');
  const i18nMovingListPAUT = t('src.screens.movingList.MovingListScreen.PAUT');
  const i18nMovingListMar = t('src.screens.movingList.MovingListScreen.Mar');
  const i18nMovingListVe = t('src.screens.movingList.MovingListScreen.Ve');
  const i18nMovingListLOI = t('src.screens.movingList.MovingListScreen.LOI');
  const i18nMovingListELPL = t('src.screens.movingList.MovingListScreen.ELPL');
  const i18nMovingListPSAVTFYPL = t('src.screens.movingList.MovingListScreen.PSAVTFYPL');
  const i18nMovingListNe = t('src.screens.movingList.MovingListScreen.Ne');

  const i18nEventEv = t('src.screens.event.EventScreen.Event');
  const i18nEventDetailED = t('src.screens.event.EventDetailScreen.ED');

  const i18nModalCalendarSc = t(
    'src.screens.components.modal.ModalCalendar.Sc',
  );
  const i18nModalCalendarDo = t(
    'src.screens.components.modal.ModalCalendar.Do',
  );

  const i18nChoosePhotoSAP = t('src.utils.choosePhoto.SAP');
  const i18nChoosePhotoCa = t('src.utils.choosePhoto.Ca');
  const i18nChoosePhotoTAP = t('src.utils.choosePhoto.TAP');
  const i18nChoosePhotoCFL = t('src.utils.choosePhoto.CFL');

  const i18nLoginTC= t('src.screens.auth.LoginScreen.TC');

  const i18nGTH= t('src.screens.SuccessScreen.GTH');

  const i18nLiveChat = t('src.screens.LiveChat.LC');
  const i18nLiveChatSe = t('src.screens.LiveChat.Se');
  const i18nLiveChatST = t('src.screens.LiveChat.ST');
  const i18nLiveChatJ = t('src.screens.LiveChat.J');

  return {
    hello,
    currency,
    ItemsAreRequired,

    welcome,
    toUrbanOS,
    withUrbanOS,
    LetsBegin,

    slide1Title,
    slide1Description,
    next,
    slide2Title,
    slide2Description,
    slide3Title,
    slide3Description,
    getStarted,

    loginWelcome,
    pleaseLogIn,
    loginId,
    loginPassword,
    forgot,
    logIn,
    termsNConditions,
    onlineRegistration,
    logInWrong,
    loginClose,
    itemRequired,
    accountPending,
    accountRejected,
    under18,
    passMismatch,

    findIdOrPass,
    pleaseSelect,
    findIdId,
    findIdPassword,
    apartmentName,
    block,
    findIdFullName,
    findIdPhone,
    findIDCancel,
    getOTP,

    i18nFindID,
    i18nFindIDOSADTPYP,

    i18nRegisterItemRequired,
    i18nRegisterPleaseFill,
    i18nRegisterFirstName,
    i18nRegisterLastName,
    i18nRegisterCountryOfOrigin,
    i18nRegisterGender,
    i18nRegisterMale,
    i18nRegisterFemale,
    i18nRegisterOther,
    i18nRegisterDOB,
    i18nRegisterPhone,
    i18nRegisterEmail,
    i18nRegisterPass,
    i18nRegisterConfPass,
    i18nRegisterIdPassportNo,
    i18nRegisterUnitInformation,
    i18nRegisterApartmentName,
    i18nRegisterBlock,
    i18nRegisterUnit,
    i18nRegisterRe,
    i18nRegisterBu,
    i18nRegisterTo,
    i18nRegisterAttachIPImages,
    i18nRegisterAttachCImages,
    i18nRegisterCancel,
    i18nRegisterConfirmation,
    i18nRegisterOnlineRegister,
    i18nRegisterPleaseMakeSure,
    i18nRegisterFullName,
    i18nRegisterApartment,
    i18nRegisterConfirm,
    i18nRegisterEdit,
    i18nRegisterRequestSent,
    i18nRegisterBackToLogin,
    i18nRegisterWeHaveReceived,
    i18nResetPassword,
    i18nResetPasswordBTL,
    i18nResetPasswordYHSUYP,
    i18nNewPassword,
    i18nConfirmPassword,
    i18nResetPasswordYPMCAM,
    i18nResetPasswordSave,
    i18nResetPasswordCancel,
    i18nResetPasswordMNPACNPF,
    i18nRegisterLengthPhoneWrong,
    i18nRegisterFormatPhoneWrong,
    i18nRegisterFormatEmailWrong,
    i18nRegisterPassowrdWrong,
    i18nRegisterRA,
    i18nRegisterSE,
    i18nRegisterPSYAASYPN,

    i18nHomeHello,
    i18nHomeProfile,
    i18nHomePoints,
    i18nHomeContactSupportTeam,
    i18nHomeBill,
    i18nHomeFacility,
    i18nHomeTicket,
    i18nHomePhoneBook,
    i18nHomeHomeService,
    i18nHomeElection,
    i18nHomeVisitor,
    i18nHomeMoving,
    i18nHomeEvent,
    i18nHomeYTIC,
    i18nHomePSYU,

    i18nSettingMo,
    i18nSettingNo,
    i18nSettingNS,
    i18nSettingSu,
    i18nSettingAn,
    i18nSettingCS,
    i18nSettingSe,
    i18nSettingAc,
    i18nSettingPr,
    i18nSettingCP,
    i18nSettingEl,
    i18nSettingLa,
    i18nSettingEn,
    i18nSettingVi,
    i18nSettingLo,
    i18nSettingGB,
    i18nSettingAskLo,

    i18nAnnounceNo,
    i18nAnnounceMAAR,

    i18nNotificationSettingBi,
    i18nNotificationSettingBo,
    i18nNotificationSettingTi,
    i18nNotificationSettingML,
    i18nNotificationSettingEv,
    i18nNotificationSettingAn,
    i18nNotificationSettingSa,

    i18nCsSupportScreenSu,
    i18nCsSupportScreenHO,
    i18nCsSupportScreenHL,
    i18nCsSupportScreenEm,
    i18nCsSupportScreenFAQ,
    i18nCsSupportScreenAl,

    i18nCsSupportScreenWIIIT,
    i18nCsSupportScreenWIIITC,
    i18nCsSupportScreenAIATSR,
    i18nCsSupportScreenNTINAP,
    i18nCsSupportScreenHDISMR,
    i18nCsSupportScreenYRASBD,
    i18nCsSupportScreenIIATAS,
    i18nCsSupportScreenNTINAI,
    i18nCsSupportScreenCICMAI,
    i18nCsSupportScreenYYCCAP,
    i18nCsSupportScreenCILITS,
    i18nCsSupportScreenWYCLIT,
    i18nCsSupportScreenIDWTRE,
    i18nCsSupportScreenYCOOOE,
    i18nCsSupportScreenDYWTETST,
    i18nCsSupportScreenCSC,
    i18nCsSupportScreenCancel,
    i18nCsSupportScreenCall,

    i18nProfileSettingPD,
    i18nProfileSettingBC,
    i18nProfileSettingMe,
    i18nProfileSettingVI,
    i18nProfileSettingAd,
    i18nProfileSettingCI,
    i18nProfileSettingRT,
    i18nProfileSettingU,
    i18nProfileSettingBi,
    i18nProfileSettingMot,
    i18nProfileSetting4,
    i18nProfileSetting7,

    i18nAddMemberAM,
    i18nAddMemberPFOTRF,
    i18nAddMemberUN,
    i18nAddMemberFiN,
    i18nAddMemberLaN,
    i18nAddMemberCo,
    i18nAddMemberGe,
    i18nAddMemberMa,
    i18nAddMemberFe,
    i18nAddMemberDOB,
    i18nAddMemberPh,
    i18nAddMemberEm,
    i18nAddMemberIPN,
    i18nAddMemberAICIBD,
    i18nAddMemberCa,
    i18nAddMemberAp,

    i18nAddVehicleAV,
    i18nAddVehiclePFIAIB,
    i18nAddVehicleTy,
    i18nAddVehicleBi,
    i18nAddVehicleMo,
    i18nAddVehicle4,
    i18nAddVehicle7,
    i18nAddVehicleBr,
    i18nAddVehiclePN,
    i18nAddVehiclePPM,
    i18nAddVehicleAI,
    i18nAddVehicleSa,
    i18nAddVehicleSS,
    i18nAddVehicleSFD,

    i18nViewProfileVP,
    i18nViewProfileFuN,
    i18nViewProfileEm,
    i18nViewProfilePh,
    i18nViewProfileCOO,
    i18nViewProfileGe,
    i18nViewProfileDOB,
    i18nViewProfileRo,
    i18nViewProfilePOR,
    i18nViewProfileIPI,
    i18nViewProfileCP,
    i18nViewProfileMa,
    i18nViewProfileFe,
    i18nViewProfileHT,
    i18nViewProfileTe,
    i18nViewProfileOHTCUT,

    i18nChangePasswordCop,
    i18nChangePasswordCuP,
    i18nChangePasswordNeP,
    i18nChangePasswordMNPW,
    i18nChangePasswordICP,
    i18nChangePasswordCPWE,
    i18nChangePasswordCoNeP,
    i18nChangePasswordSa,
    i18nChangePassword,
    i18nChangePasswordYHSUYP,
    i18nChangePasswordGTL,

    //Facility
    i18nFacility,
    i18nFacilityDes,
    i18nRecentBooking,
    i18nPleaseSelect,
    i18nFaNone,
    i18nFaCancel,
    i18nFaNB,
    i18nFaLGS,

    i18nFaDate,
    i18nFaTime,
    i18nFaPlace,
    i18nFaName,
    i18nFaUnit,
    i18nFaEmail,
    i18nFaPhone,
    i18nFaConfirm,
    i18nFaBookingSuccess,
    i18nFaYCCYBD,
    i18nFaYBHSC,
    i18nFaYCOCOT,
    i18nFaGB,

    i18nFaCed,

    i18nFaAgree,
    i18nFaUsagePolicy,
    i18nFaAnAuthorization,
    i18nFaBookingConfirm,
    i18nFaAYSYWT,
    i18nFaPolicy,
    i18nFaClose,
    i18nFaAGR,

    i18nSchedule,
    i18nScheduleBooked,
    i18nScheduleAvailable,
    i18nScheduleBooking,
    i18nScheduleAm,
    i18nSchedulePm,

    //Phone Book
    i18nPBTitle,

    //Bill
    i18nBill,
    i18nBillEB,
    i18nBillGB,
    i18nBillBD,
    i18nBillP,
    i18nBillUP,
    i18nBillTotal,
    i18nBillDueDate,
    i18nBillVat,
    i18nBillIncludeUnpaid,

    //Ticket
    i18nTicket,
    i18nTickReportIssue,
    i18nTickHistory,
    i18nTicketCreate,
    i18nTicketPleaseFillOut,
    i18nTicketTitle,
    i18nTicketType,
    i18nTicketDe,
    i18nTicketAttachImages,
    i18nTicketSomethingUrgent,
    i18nTicketCallUs,
    i18nTicketSave,
    i18nTicketCallSupport,
    i18nTicketGoBack,
    i18nTicketCall,
    i18nTicketDetail,
    i18nTicketName,
    i18nTicketUnit,
    i18nTicketEmail,
    i18nTicketPhone,
    i18nTicketEdit,
    i18nTicketDelete,
    i18nTicketEditTitle,
    i18nTicketDateTime,
    i18nTicketConfirm,
    i18nTicketCompleted,
    i18nTicketRequest,
    i18nTicketSend,
    i18nTicketSkip,
    i18nTicketSendDetail,
    i18nTicketTYFYF,
    i18nTicketTTHBC,
    i18nTicketST,
    i18nTickIntroduce,
    i18nTicketWDYWTC,
    i18nTicketTIIAR,
    i18nTicketTWTITL,
    i18nTicketINLNTS,
    i18nTicketOther,
    i18nTicketHWOS,
    i18nTicketET,
    i18nTicketNotifyService,
    i18nTicketRequestSend,

    i18nElectionEl,
    i18nElectionHi,

    i18nVisitorVi,
    i18nVisitorLOVI,
    i18nVisitorHi,
    i18nVisitorOT,
    i18nVisitorAV,
    i18nVisitorNI,
    i18nVisitorCV,
    i18nVisitorVI,
    i18nVisitorRe,
    i18nVisitorCI,
    i18nVisitorCO,
    i18nVisitorNa,
    i18nVisitorUn,
    i18nVisitorEm,
    i18nVisitorPh,
    i18nVisitorDel,
    i18nVisitorRes,
    i18nVisitorCa,
    i18nVisitorCo,
    i18nVisitorDYWTDT,
    i18nVisitorAIAR,
    i18nVisitorFuN,
    i18nVisitorIPN,
    i18nVisitorDAT,
    i18nVisitorRFV,
    i18nVisitorSa,
    i18nVisitorSc,
    i18nVisitorDo,
    i18nVisitorDYWTSA,
    i18nVisitorPFOTIB,
    i18nVisitorSR,
    i18nVisitorMDOTV,
    i18nVisitorTYFIUA,
    i18nVisitorNS,
    i18nVisitorVC,
    i18nVisitorUV,

    i18nMovingListMo,
    i18nMovingListCML,
    i18nMovingListML,
    i18nMovingListPLTITY,
    i18nMovingListNDIL,
    i18nMovingListLGS,
    i18nMovingListCr,
    i18nMovingListDa,
    i18nMovingListIt,
    i18nMovingListTa,
    i18nMovingListCh,
    i18nMovingListSt,
    i18nMovingListAp,
    i18nMovingListSu,
    i18nMovingListRe,
    i18nMovingListRD,
    i18nMovingListMAF,
    i18nMovingListMO,
    i18nMovingListQu,
    i18nMovingListNa,
    i18nMovingListUn,
    i18nMovingListEm,
    i18nMovingListPh,
    i18nMovingListDe,
    i18nMovingListAI,
    i18nMovingListATL,
    i18nMovingListNML,
    i18nMovingListSa,
    i18nMovingListDo,
    i18nMovingListCl,
    i18nMovingListAARWBS,
    i18nMovingListGB,
    i18nMovingListCo,
    i18nMovingListCL,
    i18nMovingListCD,
    i18nMovingListPAIOYC,
    i18nMovingListCFL,
    i18nMovingListRS,
    i18nMovingListYRWBTI,
    i18nMovingListCP,
    i18nMovingListGTH,
    i18nMovingListFu,
    i18nMovingListMoOu,
    i18nMovingListAIAR,
    i18nMovingListMd,
    i18nMovingListPSATS,
    i18nMovingListEL,
    i18nMovingListPL,
    i18nMovingListPLS,
    i18nMovingListELS,
    i18nMovingListSch,
    i18nMovingListBo,
    i18nMovingListS,
    i18nMovingListB,
    i18nMovingListC,
    i18nMovingListCed,
    i18nMovingListSui,
    i18nMovingListAbo,
    i18nMovingListSNTC,
    i18nMovingListTSSMBC,
    i18nMovingListPMSUOIB,
    i18nMovingListR,
    i18nMovingListVM,
    i18nMovingListPAUT,
    i18nMovingListMar,
    i18nMovingListVe,
    i18nMovingListELPL,
    i18nMovingListPSAVTFYPL,
    i18nMovingListLOI,
    i18nMovingListNe,

    i18nEventEv,
    i18nEventDetailED,

    i18nModalCalendarSc,
    i18nModalCalendarDo,

    i18nChoosePhotoSAP,
    i18nChoosePhotoCa,
    i18nChoosePhotoTAP,
    i18nChoosePhotoCFL,
    
    i18nElectionED,
    i18nElectionDe,
    i18nElectionRe,
    i18nElectionEl,
    i18nElectionTOO,
    i18nElectionSE,
    i18nElectionCa,
    i18nElectionTEHE,
    i18nElectionES,
    i18nElectionTYFV,
    i18nElectionPLFTTUE,
    i18nElectionEC,
    i18nElectionD,
    i18nElectionCD,
    i18nElectionPCYVF,
    i18nElectionYCCYVA,
    i18nElectionYHVF,
    i18nElectionVS,
    i18nElectionYVHBC,
    i18nElectionTERWBA,
    i18nElectionCI,
    i18nElectionRule,
    i18nElectionEmpty,

    i18nLoginTC,

    i18nGTH,

    i18nSearchApartment,
    i18nEYAN,
    i18nAP,

    i18nOtpDRAC,
    i18nOtpEOST,
    i18nOtpRN,
    i18nOtpV,
    i18nOtpOV,
    i18nOtpOYEAWO,
    i18nOtpOYROOT,
    i18nOtpC,
    i18nOtpYIHBSV,
    i18nOtpS,
    i18nOtpR,

    i18nLiveChat,
    i18nLiveChatSe,
    i18nLiveChatST,
    i18nLiveChatJ,
  };
};
