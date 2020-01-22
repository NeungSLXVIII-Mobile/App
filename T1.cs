using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// Ads.
using GoogleMobileAds;
using GoogleMobileAds.Api;
using System;
using UnityEngine.UI;

public class AdmobScript : MonoBehaviour
{
    // Ad.
    private BannerView viewBanner;
    private InterstitialAd viewInterstitial;
    private RewardBasedVideoAd viewRewardBasedVideo;

    private bool boolIsGetRewarded;

    void Awake()
    {
        DontDestroyOnLoad(gameObject);
    }

    // Use this for initialization
    void Start()
    {
#if UNITY_ANDROID
		string appId = "ca-app-pub-xxxxxxxxxxxxxxxx~xxxxxxxxxx";
#elif UNITY_IPHONE
		string appId = "ca-app-pub-xxxxxxxxxxxxxxxx~xxxxxxxxxx";
#else
        string appId = "unexpected_platform";
#endif
        MobileAds.Initialize(appId);
    }

    // Update is called once per frame
    void Update()
    {
        //
    }

    void OnDestroy()
    {
        Debug.Log("Destroy");

        if (viewBanner != null)
        {
            viewBanner.OnAdLoaded -= this.HandleAdLoaded;
            viewBanner.OnAdFailedToLoad -= this.HandleAdFailedToLoad;
            viewBanner.OnAdOpening -= this.HandleAdOpened;
            viewBanner.OnAdClosed -= this.HandleAdClosed;
            viewBanner.OnAdLeavingApplication -= this.HandleAdLeftApplication;

            viewBanner.Destroy();
        }

        if (viewInterstitial != null)
        {
            viewInterstitial.OnAdLoaded -= this.HandleInterstitialLoaded;
            viewInterstitial.OnAdFailedToLoad -= this.HandleInterstitialFailedToLoad;
            viewInterstitial.OnAdOpening -= this.HandleInterstitialOpened;
            viewInterstitial.OnAdClosed -= this.HandleInterstitialClosed;
            viewInterstitial.OnAdLeavingApplication -= this.HandleInterstitialLeftApplication;

            viewInterstitial.Destroy();
        }
    }

    // Ads.
    public void RequestBanner()
    {
#if UNITY_EDITOR
		string strAdUnitId = "unused";
#elif UNITY_ANDROID
		string strAdUnitId = "ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx”;
#elif UNITY_IPHONE
		string strAdUnitId = "ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx”;
#else
        string strAdUnitId = "unexpected_platform";
#endif

        if (viewBanner == null)
        {
            viewBanner = new BannerView(strAdUnitId, AdSize.Banner, AdPosition.Top);
            viewBanner.OnAdLoaded += this.HandleAdLoaded;
            viewBanner.OnAdFailedToLoad += this.HandleAdFailedToLoad;
            viewBanner.OnAdOpening += this.HandleAdOpened;
            viewBanner.OnAdClosed += this.HandleAdClosed;
            viewBanner.OnAdLeavingApplication += this.HandleAdLeftApplication;
        }

        viewBanner.LoadAd(CreateAdRequest());
    }

    public void RequestInterstitial()
    {
#if UNITY_EDITOR
		string strAdUnitId = "unused";
#elif UNITY_ANDROID
		string strAdUnitId = "ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx”;
#elif UNITY_IPHONE
		string strAdUnitId = "ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx”;
#else
        string strAdUnitId = "unexpected_platform";
#endif

        if (viewInterstitial == null)
        {
            viewInterstitial = new InterstitialAd(strAdUnitId);
            viewInterstitial.OnAdLoaded += this.HandleInterstitialLoaded;
            viewInterstitial.OnAdFailedToLoad += this.HandleInterstitialFailedToLoad;
            viewInterstitial.OnAdOpening += this.HandleInterstitialOpened;
            viewInterstitial.OnAdClosed += this.HandleInterstitialClosed;
            viewInterstitial.OnAdLeavingApplication += this.HandleInterstitialLeftApplication;
        }

        viewInterstitial.LoadAd(CreateAdRequest());
    }

    private AdRequest CreateAdRequest()
    {
        /*return new AdRequest.Builder ()
		.AddTestDevice (AdRequest.TestDeviceSimulator)
		.AddTestDevice ("62F3F83CB3B770723638A5B59D10E998")
		.AddKeyword ("game")
		.SetGender (Gender.Male)
		.SetBirthday (new System.DateTime (1985, 1, 1))
		.TagForChildDirectedTreatment (false)
		.AddExtra ("color_bg", "9B30FF")
		.Build ();*/

        return new AdRequest.Builder()
        .AddTestDevice(AdRequest.TestDeviceSimulator)
        .AddTestDevice("62F3F83CB3B770723638A5B59D10E998")
        .AddTestDevice("550c81bf6d05da1a00cb415258727f2b")
        .AddTestDevice("1A0A64D7771C95BDF799D1CAA3B9315D")
        .AddKeyword("game")
        .Build();
    }

    // Banner.
    public void HandleAdLoaded(object sender, EventArgs args)
    {
        Debug.Log("AdLoaded");
    }

    public void HandleAdFailedToLoad(object sender, AdFailedToLoadEventArgs args)
    {
        Debug.Log("FailedToReceiveAd: " + args.Message);
    }

    public void HandleAdOpened(object sender, EventArgs args)
    {
        Debug.Log("AdOpened");
    }

    public void HandleAdClosed(object sender, EventArgs args)
    {
        Debug.Log("AdClosed");
    }

    public void HandleAdLeftApplication(object sender, EventArgs args)
    {
        Debug.Log("AdLeftApplication");
    }

    // Interstitial.
    public void HandleInterstitialLoaded(object sender, EventArgs args)
    {
        Debug.Log("InterstitialLoaded");

        viewInterstitial.Show();
    }

    public void HandleInterstitialFailedToLoad(object sender, AdFailedToLoadEventArgs args)
    {
        Debug.Log("InterstitialFailedToLoad: " + args.Message);
    }

    public void HandleInterstitialOpened(object sender, EventArgs args)
    {
        Debug.Log("InterstitialOpened");
    }

    public void HandleInterstitialClosed(object sender, EventArgs args)
    {
        Debug.Log("InterstitialClosed");
    }

    public void HandleInterstitialLeftApplication(object sender, EventArgs args)
    {
        Debug.Log("InterstitialLeftApplication");
    }

    // RewardBasedVideo.
    public void RequestRewardBasedVideo()
    {
#if UNITY_EDITOR
		string strAdUnitId = "unused";
#elif UNITY_ANDROID
		string strAdUnitId = "unused";
#elif UNITY_IPHONE
		string strAdUnitId = "unused";
#else
        string strAdUnitId = "unexpected_platform";
#endif

        if (viewRewardBasedVideo == null)
        {
            viewRewardBasedVideo = RewardBasedVideoAd.Instance;
            viewRewardBasedVideo.OnAdLoaded += this.HandleRewardBasedVideoLoaded;
            viewRewardBasedVideo.OnAdFailedToLoad += this.HandleRewardBasedVideoFailedToLoad;
            viewRewardBasedVideo.OnAdOpening += this.HandleRewardBasedVideoOpened;
            viewRewardBasedVideo.OnAdClosed += this.HandleRewardBasedVideoClosed;
            viewRewardBasedVideo.OnAdRewarded += this.HandleRewardBasedVideoRewarded;
            viewRewardBasedVideo.OnAdLeavingApplication += this.HandleRewardBasedVideoLeftApplication;
        }

        viewRewardBasedVideo.LoadAd(CreateAdRequest(), strAdUnitId);
    }

    public void HandleRewardBasedVideoLoaded(object sender, EventArgs args)
    {
        Debug.Log("RewardBasedVideoLoaded");
    }

    public void HandleRewardBasedVideoFailedToLoad(object sender, AdFailedToLoadEventArgs args)
    {
        Debug.Log("RewardBasedVideoFailedToLoad: " + args.Message);
    }

    public void HandleRewardBasedVideoOpened(object sender, EventArgs args)
    {
        Debug.Log("RewardBasedVideoOpened");
    }

    public void HandleRewardBasedVideoClosed(object sender, EventArgs args)
    {
        Debug.Log("RewardBasedVideoClosed");
    }

    public void HandleRewardBasedVideoRewarded(object sender, Reward args)
    {
        string type = args.Type;
        double amount = args.Amount;

        Debug.Log("RewardBasedVideoRewarded : " + amount.ToString() + " " + type);

        if (!boolIsGetRewarded)
        {
            boolIsGetRewarded = true;

            // 1 UP.
            int intCoin1UP = PlayerPrefs.GetInt("COIN1UP", 0);

            intCoin1UP += (int)amount;

            if (intCoin1UP >= 99)
            {
                intCoin1UP = 99;
            }

            PlayerPrefs.SetInt("COIN1UP", intCoin1UP);
            PlayerPrefs.Save();

            RequestRewardBasedVideo();
        }
    }

    public void HandleRewardBasedVideoLeftApplication(object sender, EventArgs args)
    {
        Debug.Log("RewardBasedVideoLeftApplication");
    }

    public void GetReward()
    {
        if (viewRewardBasedVideo == null)
        {
            return;
        }

        if (viewRewardBasedVideo.IsLoaded())
        {
            viewRewardBasedVideo.Show();

            boolIsGetRewarded = false;
        }
    }

    public bool HasReward()
    {
        if (viewRewardBasedVideo != null)
        {
            return viewRewardBasedVideo.IsLoaded();
        }

        return false;
    }

    public void HideBanner(bool boolIsHide)
    {
        if (viewBanner != null)
        {
            if (boolIsHide)
            {
                viewBanner.Hide();
            }
            else
            {
                viewBanner.Show();
            }
        }
    }
}
