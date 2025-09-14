# nord-homepage-tab

My personal "new tab" as a chrome extension

![image](https://github.com/user-attachments/assets/ca100a6c-e929-4a16-93a7-cc29f601ef85)

#### Motivation

I've been using [NewTab-Redirect](https://github.com/jimschubert/NewTab-Redirect) chrome extension to have a local html file open for new tabs in Brave Browser, but the extension seems a bit abandoned, and eventually stopped working altogether for local files.

Therefore I've converted my local new-tab.html file into an extension of its own, which I add to brave manually via "load unpacked" extension option in brave://extensions (developer mode needs to be enabled for this to work)

### Usage

- Clone the repo `git clone https://github.com/serpro69/serpro-new-tab.git`
- Create `data.json` file and add your bookmarks to it (use `sample-data.json` as example)
- Open extensions: type `brave://extensions/` in the address bar (or `chrome://extensions/` if you're *still* using Chrome)
  - Enable developer mode
  - Click 'Load unpacked' and select the path to the cloned repo on your local machine
- Profit

To update simply run `git pull` in the repo. 
The browser should automatically use latest code, but you can also reload the extension manually from the extensions page.

#### Icon Support

The following icon-sets are supported:

- [materialdesign](https://pictogrammers.com/library/mdi/)
- [fontawesome (free)](https://fontawesome.com/icons)
- [simple icons](https://simpleicons.org/?q=kubernet)
- [devicon](https://devicon.dev/)

### Credits

- [xero/startpage](https://github.com/xero/startpage)

### ToDo

- [ ] installation for firefox
  - [prefereably avoid building/packaging](https://github.com/tsaost/autoload-temporary-addon)
