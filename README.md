HumanTranslated TUI client
==========================

The TUI client is the first client to test and integrate new API features. 

# Requirements

Debian / Ubuntu

* ncurses-base
* ncurses-term

# Build

```
gulp js:build
```

# Test

```
make test
```

# Usage

```bash
#
# Account / registration
#

# oauth2 configuration
./bin/humantranslated config

# register for a new account
# POST /api/v1/register
```json
// user.json
{
  "username": "joedirt",
  "email": "user@email.com",
  "password": "HASHED_PASSWORD",
  "first_name": "Joe",
  "last_name": "Dirt",
  "twitter_id" "joedirt",
  "facebook_id": "joedirt",
  "github_id": "joedirt",
  "google_id": "joedirt"
}
```

```bash
./bin/humantranslated register --user user.json
```

#
# Stories
#

```bash
# list stories
./bin/humantranslated story list
```

```bash
# display story
./bin/humantranslated story view --story-id STORYID
```

```bash
# add story
./bin/humantranslated story new STORY.json
```

```bash
# modify story
./bin/humantranslated story modify --story-id STORYID STORY.json
```

```bash
# delete story
./bin/humantranslated story delete --story-id STORYID
```

#
# Categories
# 

# list categories
```bash
./bin/humantranslated category list
```

```bash
# display category
./bin/humantranslated category view --category-name CATEGORYNAME
```

```bash
# add category
./bin/humantranslated category new --category-name CATEGORYNAME
```

```bash
# modify category
./bin/humantranslated category modify --category-name OLDCATEGORYNAME --new-name NEWCATEGORYNAME
```

```bash
# delete category
./bin/humantranslated category delete --category-name CATEGORYNAME
```

```
# Example story.json
```json
{
   "_id":"54c472c4a0184093650c618e",
   "content":"イスラム過激派組織「イスラム国」とみられる組織に拘束された後藤健二さんが湯川遥菜さんとみられる写真を持ち、「湯川さんが殺された」とする音声が付けられた画像がインターネット上に投稿されました。音声は後藤さんの解放の条件としてヨルダンで拘束されている「イスラム国」の関係者の釈放を求めています。\n\n日本時間２４日午後１１時すぎ、インターネットの動画サイトにイスラム過激派組織「イスラム国」とみられる組織に拘束された後藤健二さんが、オレンジ色の服を着て写真を持っている画像が投稿されました。\n画像の冒頭には、「後藤さんの家族と日本政府が受け取ったものだ」とする英語の文章が表示されます。\n画像には、後藤さんを名乗る男の声で英語の音声が付いていて、「これは私と共に拘束された湯川さんが殺害された写真だ」と述べています。そして、「妻よ、愛している。２人の子どもに会いたい」と呼びかけたうえで、「同じことを繰り返させないでくれ。諦めないで、家族や友人、そして私の会社の同僚と共に日本政府に圧力をかけ続けてくれ」と述べています。\n\nさらに、「イスラム国の要求は難しいものではない。彼らはもはや金を要求しておらず、テロリストに資金を渡す心配をする必要はない。彼らはヨルダン当局に拘束されているサジダ・アル・リシャウィの釈放を求めているだけだ。彼女が釈放されれば私も解放される」と述べ、ヨルダンで拘束されているイスラム国の関係者とみられる人物が釈放されれば、それと引き換えに後藤さんが解放されるとしています。\n\n中東のメディアによりますと、サジダ・アル・リシャウィという人物は、２００５年にヨルダンの首都アンマンで５０人以上が死亡した連続自爆テロ事件の実行犯の１人としてヨルダン当局に拘束され、翌年の２００６年に死刑判決を受けたイラク人の女とみられています。\n\n今回の画像の信ぴょう性が認められれば、「イスラム国」とみられる組織がこれまでの身代金から、ヨルダン政府に拘束されているとする仲間の釈放に要求を変えたことになります。",
   "title":"湯川さんとみられる殺害画像 ネットに投稿"
}
```
