#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <RCTOneSignal.h>
#import <UserNotifications/UNUserNotificationCenter.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;
@property (strong, nonatomic) RCTOneSignal* oneSignal;

@end
