$render('layout')

$replace('body')
<section class="bg-gray-50">
  <div class="flex flex-col items-center justify-center min-h-screen sm:p-6">
    <div class='w-full sm:max-w-md'>
      $if(error)
      $render('components.alerts.error', message=error)$endrender
      $endif
    </div>
    <div class="w-full md:mt-0 sm:max-w-md xl:p-0">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        $render('components.headers.h2', title=' Sign in to your account')
        $endrender
        <form class="space-y-4 md:space-y-6" action="/login" method='POST'>
          <div>
            $render('components.label',for='email',title='Your email')
            $endrender
            $render('components.inputs.email', value=body.email)$endrender
          </div>
          <div>
            $render('components.label', for='password', title='Password')
            $endrender
            $render('components.inputs.password', name='password',
            value=body.password)$endrender
          </div>
          <div class="flex items-center justify-between">
            $render('components.links.underline',
            href='/request-reset',title='Forgot password?')
            $endrender
          </div>
          $render('components.buttons.primary', title='Sign in', style='w-full',
          type='submit') $endrender
          <p class="text-sm font-light text-gray-500">
            Don’t have an account yet? <a href="/register"
              class="font-medium text-black hover:underline">Sign
              up</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
$endreplace

$endrender