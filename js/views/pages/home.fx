$render('layout')

$replace('body')
<main class="flex flex-col">
  <header>
    <!-- Dektop navbar -->
    <nav class="flex items-center justify-between p-6 md:px-8 z-0 relative"
      aria-label="Global">

      <!-- Bnjsx icon -->
      <div class="flex md:flex-1">
        $include('components.icons.bnjsx')
      </div>

      <!-- Mobile open menu icon -->
      <div class="flex md:hidden">
        <button id='nav-open' type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span class="sr-only">Open main menu</span>
          $include('components.icons.menu')
        </button>
      </div>

      <div class="hidden md:flex md:gap-x-12">
        $render('components.links.simple',
        href='https://github.com/bnjsx/bnjsx', title='Documentation')
        $endrender

        $render('components.links.simple',
        href='https://github.com/bnjsx/bnjsx/blob/main/CONTRIBUTING.md',
        title='Contribution')
        $endrender

        $render('components.links.simple',
        href='https://www.npmjs.com/package/bnjsx', title='Packages')
        $endrender

        $render('components.links.simple',
        href='https://github.com/bnjsx/bnjsx/issues', title='Issues')
        $endrender
      </div>

      <div class="hidden md:flex md:flex-1 md:justify-end">
        $if(user)
        <form action="/logout" method="POST">
          <button type="submit"
            class="cursor-pointer text-sm/6 font-semibold text-gray-900">Log
            out</button>
        </form>
        $else
        <a href="/login"
          class="cursor-pointer text-sm/6 font-semibold text-gray-900">Log
          in</a>
        $endif
      </div>
    </nav>

    <!-- Mobile nav -->
    <div id='nav-menu'
      class="md:hidden fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      role="dialog" aria-modal="true">

      <!-- Mobile logo and xmark -->
      <div class="flex items-center justify-between">
        $include('components.icons.bnjsx')

        <button id="nav-close" type="button"
          class="-m-2.5 rounded-md p-2.5 text-gray-700">
          <span class="sr-only">Close menu</span>
          $include('components.icons.xmark')
        </button>
      </div>

      <!-- Mobile nav links -->
      <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-gray-500/10">
          <div class="space-y-2 py-6">
            $render('components.links.mobile',
            href='https://github.com/bnjsx/bnjsx', title='Documentation')
            $endrender

            $render('components.links.mobile',
            href='https://github.com/bnjsx/bnjsx/blob/main/CONTRIBUTING.md',
            title='Contribution')
            $endrender

            $render('components.links.mobile',
            href='https://www.npmjs.com/package/bnjsx', title='Packages')
            $endrender

            $render('components.links.mobile',
            href='https://github.com/bnjsx/bnjsx/issues', title='Issues')
            $endrender
          </div>
          <div class="py-6">
            $if(user)
            <form action="/logout" method="POST">
              <button type="submit">
                $render('components.links.mobile', href='#', title='Sign out')
                $endrender
              </button>
            </form>
            $else
            $render('components.links.mobile', href='/login', title='Sign in')
            $endrender
            $endif
          </div>
        </div>
      </div>

    </div>
  </header>

  <section
    class="pb-8 bg-gray-50 min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">

    <!-- Logo Image -->
    <a href="/"><img src="/icon.png" alt="Logo"
        class="logo cursor-pointer w-32 h-32 sm:w-40 sm:h-40 transition-transform duration-300 hover:scale-103 z-20 relative">
    </a>
    $render('components.headers.h1', title='Better NodeJS Experience')
    $endrender

    $render('components.paras.p1', title='A fast and lightweight Node.js
    framework designed for modern web
    development.')
    $endrender

    <div class="mt-6 space-x-4">
      <a href="https://github.com/bnjsx/bnjsx">
        $render('components.buttons.primary', title='Get Started')$endrender
      </a>
      <a href="https://github.com/bnjsx/bnjsx">
        $render('components.buttons.primary', title='View On GitHub')$endrender
      </a>
    </div>
  </section>

</main>
$endreplace

$endrender