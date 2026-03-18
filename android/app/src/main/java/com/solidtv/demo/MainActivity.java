package com.solidtv.demo;

import android.view.KeyEvent;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            // Forcing a JS event because WebView often consumes KEYCODE_BACK for history navigation
            String scripts = "window.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Back', 'keyCode': 4, 'bubbles': true, 'cancelable': true }));";
            this.getBridge().getWebView().evaluateJavascript(scripts, null);
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            String scripts = "window.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'Back', 'keyCode': 4, 'bubbles': true, 'cancelable': true }));";
            this.getBridge().getWebView().evaluateJavascript(scripts, null);
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }
}
