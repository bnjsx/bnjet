$render('layout')

$replace('body')
<section class="bg-gray-50">
  <div
    class="flex flex-col items-center justify-center min-h-screen p-0 sm:p-6 ">

    <div class='w-full sm:max-w-md'>
      $if(error)
      $render('components.alerts.error', message=error)$endrender
      $endif
    </div>

    <div class="w-full md:mt-0 sm:max-w-md p-4">

      $render('components.headers.h2', title='Reset Your Password')$endrender

      $render('components.paras.p2', title='Enter your new password below and
      confirm it to complete the reset process.')
      $endrender

      <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" method="POST"
        action="/password-reset/$(token)">

        <div>
          $render('components.label', for='password', title='Password')
          $endrender
          $render('components.inputs.password', name='password',
          value=body.password)
          $endrender
        </div>

        <div>
          $render('components.label', for='confirmation',
          title='Confirm Password')
          $endrender
          $render('components.inputs.password', name='confirmation',
          value=body.confirmation)
          $endrender
        </div>

        $render('components.buttons.primary', title='Sign up', style='w-full',
        type='submit')$endrender
      </form>
    </div>
  </div>
</section>
$endreplace

$endrender